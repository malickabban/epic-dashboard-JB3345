package com.backend;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;

import org.hl7.fhir.r4.model.*;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Patient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.instance.model.api.IIdType;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.HashMap;


@Component
public class GetPatientsService {

    private final FhirContext ctx = FhirContext.forR4Cached();
    private final IGenericClient client = ctx.newRestfulGenericClient("https://hapi.fhir.org/baseR4");

    @GetMapping("/getPatients")
    public HashMap<String, com.backend.Patient> getData() throws IOException {
        Bundle response = patientSearch("2011-01-01", "Smith");
        HashMap<String, com.backend.Patient> patients = processPatients(response);
        calculateChadsVasc(patients);
        return patients;
    }


    //This is where patient api call will be handled
    private Bundle patientSearch(String birthday, String practitionerName) {
        return client.search()
		.forResource(Patient.class)
		.where(Patient.GENERAL_PRACTITIONER.hasChainedProperty(
				Organization.NAME.matches().value(practitionerName)))
		.returnBundle(Bundle.class)
		.execute();
    }
	//Creating the patient objects will go here. For each api call to get data (condition, encounter, etc) a new method is used	
    private HashMap<String, com.backend.Patient> processPatients(Bundle response) {
        HashMap<String, com.backend.Patient> patientsMap = new HashMap<>();
        int count = 0;

        for (BundleEntryComponent entry : response.getEntry()) {
            // Retrieve the patient resource from each entry
            IBaseResource resource = entry.getResource();

            // Check if the resource is of type Patient
            if (resource instanceof Patient) {
                Patient current_patient = (Patient) resource;

                com.backend.Patient newPatient = new com.backend.Patient(current_patient.getNameFirstRep().getNameAsSingleString());
                newPatient.setPatientId(current_patient.getIdentifierFirstRep().toString().split("@")[1]);
                
                addGender(current_patient, newPatient);

                //for debugging, patient must have birthdate
                if (current_patient.getBirthDate() != null) {
                    addAge(current_patient, newPatient);
                } else {
                    System.out.println("No birth date information available for patient with ID: " + newPatient.getPatientID());
                }
                addConditions(current_patient, newPatient);
                addEncounters(current_patient, newPatient);
                addObservations(current_patient, newPatient);
                addPractitioner(current_patient, newPatient);
                addMedications(current_patient, newPatient);
                // Left because only 1 patient has medication, might want to test more in future
                /*
                if (newPatient.getMedications() != null) {
                    for (String x : newPatient.getMedications()) {
                        System.out.println(x);
                    }
                }
                */
                patientsMap.put(newPatient.getPatientID(), newPatient);
            }
            count++;
            if (count == 10){
                break;
            }
        }
        return patientsMap;
    }
    // Cacluating RCRI


    private void calculateChadsVasc(HashMap<String, com.backend.Patient> patients) {
        for (com.backend.Patient patient : patients.values()) {
            int chadsVascScore = 0;
            
            //C
            if (patient.hasCHF()) {
                chadsVascScore += 1;
            }
            ////H
            if (patient.hasHypertension()) {
                chadsVascScore += 1;
            }
            //A
            if (patient.getAge() >= 75) {
                chadsVascScore += 2;
            }
            //D
            if (patient.hasDiabetes()) {
                chadsVascScore += 1;
            }
            //S
            if (patient.hasStroke()) {
                chadsVascScore += 2;
            }
            //V
            if (patient.hasVD()) {
                chadsVascScore += 1;
            }
            //A
            if (patient.getAge() >= 65 && patient.getAge() <= 74) {
                chadsVascScore += 1;
            }
            //S
            if (patient.getGender().equalsIgnoreCase("female")) {
                chadsVascScore += 1;
            }
            System.out.println(patient.getAge());
            System.out.println(patient.getGender());
            System.out.println(chadsVascScore);
            patient.setChadsVasc(chadsVascScore);
        }
    }
    // Method for adding observations
    private void addObservations(Patient current_patient, com.backend.Patient newPatient) {
        ArrayList<String> observations= new ArrayList<String>();
        for (Observation o : getResourcesForPatient(client, Observation.class, current_patient.getId())){
            observations.add(o.getCode().getText());

            // Creatinine Level Check
            CodeableConcept concept = o.getCode();
            if (concept.hasCoding()) {
                for (Coding coding : concept.getCoding()) {
                    if (coding.getDisplay() != null && coding.getDisplay().toLowerCase().contains("creatinine")) {
                        Quantity quantity = o.getValueQuantity();
                        if (quantity != null && quantity.getValue().compareTo(new BigDecimal("2.0")) > 0) {
                            newPatient.setPreOperativeCreatinineAboveTwo(true);
                        }
                    }
                }
            }
        }
        if (observations.size() != 0) {
            newPatient.setObservations((String[]) observations.toArray(new String[observations.size()])); 
        }
    }

    private void addEncounters(Patient current_patient, com.backend.Patient newPatient) { 
        ArrayList<String> encounterDetails = new ArrayList<>();
        for (Encounter e : getResourcesForPatient(client, Encounter.class, current_patient.getId())) {
            StringBuilder encounterInfo = new StringBuilder();

            // Add encounter date if available
            if (e.getPeriod() != null && e.getPeriod().getStart() != null) {
                DateTimeType startDate = e.getPeriod().getStartElement();
                encounterInfo.append("Date: ").append(startDate.toHumanDisplay());
            }
                    
            // Add reason for the encounter if available
            if (!e.getReasonCode().isEmpty()) {
                String reasons = e.getReasonCode().stream()
                                .map(rc -> rc.getCodingFirstRep().getDisplay())
                                .filter(Objects::nonNull)
                                .collect(Collectors.joining(", "));
                if (!reasons.isEmpty()) {
                    encounterInfo.append(", Reason: ").append(reasons);
                }
            }
                    
            // Add primary diagnosis for the encounter if available
            if (!e.getDiagnosis().isEmpty()) {
                Encounter.DiagnosisComponent diagnosisComponent = e.getDiagnosisFirstRep();
                if (diagnosisComponent.getCondition() != null) {
                    IIdType idType = diagnosisComponent.getCondition().getReferenceElement();
                    if (idType != null && idType.getResourceType().equals("Condition")) {
                        Condition condition = client.read().resource(Condition.class).withId(idType.getIdPart()).execute();
                        if (condition.hasCode()) {
                            String diagnosisDisplay = condition.getCode().getCodingFirstRep().getDisplay();
                            encounterInfo.append(", Diagnosis: ").append(diagnosisDisplay);
                        }
                    }
                }
            }
            // Only add to the list if encounterInfo has content
            if (encounterInfo.length() > 0) {
                encounterDetails.add(encounterInfo.toString());
            }
        }
        // If there are encounters, add them to the patient
        if (!encounterDetails.isEmpty()) {
            newPatient.setEncounters(encounterDetails.toArray(new String[0]));
        }
    }
    
    private void addGender(Patient current_patient, com.backend.Patient newPatient) {
        String sex = current_patient.getGenderElement().getValueAsString();
        if (sex != null && !sex.isEmpty()) {
            newPatient.setGender(sex);
        } else {
            newPatient.setGender("Unknown");
        }
    }


    private void addAge(Patient current_patient, com.backend.Patient newPatient) {
        LocalDate birthDate = current_patient.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate currentDate = LocalDate.now();
        Period age = Period.between(birthDate, currentDate);
        int years = age.getYears();
        newPatient.setAge(years);
    }
    
    
    private void addConditions(Patient current_patient, com.backend.Patient newPatient) {
        ArrayList<String> conditions = new ArrayList<String>();
        for (Condition c : getResourcesForPatient(client, Condition.class, current_patient.getId())){
            getChadsVascValues(c, newPatient);
            String conditionDisplay = "";
            if (c.getCode().getCodingFirstRep().getDisplay() != null) {
                conditionDisplay = c.getCode().getCodingFirstRep().getDisplay().toLowerCase();
            }

            // Ischemic Heart Disease
            if (conditionDisplay.contains("ischemic heart disease") || conditionDisplay.contains("myocardial infarction")) {
                newPatient.setIschemicHeartDisease(true);
            }
            
            // Cerebrovascular Disease
            if (conditionDisplay.contains("cerebrovascular accident") || conditionDisplay.contains("stroke") || conditionDisplay.contains("transient ischemic attack")) {
                newPatient.setCerebrovascularDisease(true);
            }

            conditions.add(c.getCode().getText());
        }
        // If there are conditions add them to the patient
        if (conditions.size() != 0) {
            newPatient.setConditions((String[]) conditions.toArray(new String[conditions.size()]));
        }
    }

    private void addMedications(Patient current_patient, com.backend.Patient newPatient) {
        ArrayList<String> medications = new ArrayList<String>();
        for (MedicationStatement c : getResourcesForPatient(client, MedicationStatement.class, current_patient.getId())){
            CodeableConcept m = (CodeableConcept) (c.getMedication());
            medications.add(m.getText());

            // Check for Insulin 
            if (m.getText().toLowerCase().contains("insulin")) {
                newPatient.setOnPreOperativeInsulin(true);
            }
        }
        // If there are conditions add them to the patient
        if (medications.size() != 0) {
            newPatient.setMedications((String[]) medications.toArray(new String[medications.size()]));
        }
    }
    
    private void getChadsVascValues(Condition condition, com.backend.Patient newPatient) {
        if (condition.getCode().getCodingFirstRep().getDisplay() == null) {
            return;
        }
        String codeDisplay = condition.getCode().getCodingFirstRep().getDisplay().toLowerCase();
        if (codeDisplay == null) {
            return;
        }
        if (codeDisplay.contains("congestive heart failure")) {
            newPatient.setCHF(true);
            return;
        }
        //need to check if these conditions are right
        if (codeDisplay.contains("stroke") || codeDisplay.contains("transient ischemic attack") || codeDisplay.contains("embolism")) {
            newPatient.setStroke(true);
            return;
        }
        if (codeDisplay.contains("diabetes")) {
            newPatient.setDiabetes(true);
            return;
        }
        if (codeDisplay.contains("vascular disease")) {
            newPatient.setVD(true);
            return;
        }
        if (codeDisplay.contains("hypertension")) {
            newPatient.setHypertension(true);
            return;
        }
    }

    private void addPractitioner(Patient current_patient, com.backend.Patient newPatient) {
        try {
            if (!current_patient.getGeneralPractitioner().isEmpty()) {
                String practitionerReference = current_patient.getGeneralPractitionerFirstRep().getReference();
                
                // Check if the reference format is correct
                if (practitionerReference.startsWith("Practitioner/")) {
                    String practitionerId = practitionerReference.split("/")[1];

                    Practitioner practitioner = client.read()
                                                      .resource(Practitioner.class)
                                                      .withId(practitionerId)
                                                      .execute();

                    if (practitioner.hasName()) {
                        HumanName name = practitioner.getNameFirstRep();
                        String fullName = name.getGivenAsSingleString() + " " + name.getFamily();
                        newPatient.setGeneralPractitioner(fullName);
                    }
                }
            }
        } catch (Exception e) {
            //One instance when testing on practitioner having a different reference
            System.err.println("Error processing practitioner reference: " + e.getMessage());
        }
    }

    //Generic api call to get resource of unspecified type
    private <T> List<T> getResourcesForPatient(IGenericClient client, Class<T> resourceClass, String patientId) {
        Bundle bundle = client.search().forResource(resourceClass.getSimpleName())
                .where(Observation.PATIENT.hasId(patientId))
                .returnBundle(Bundle.class).execute();
        List<T> resources = new ArrayList<>();
        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            if (resourceClass.isInstance(entry.getResource())) {
                resources.add(resourceClass.cast(entry.getResource()));
            }
        }
        return resources;
    }
}
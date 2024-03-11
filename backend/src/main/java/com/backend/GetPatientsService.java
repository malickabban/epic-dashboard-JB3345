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
import java.util.HashSet;


@Component
public class GetPatientsService {

    private final FhirContext ctx = FhirContext.forR4Cached();
    private final IGenericClient client = ctx.newRestfulGenericClient("https://hapi.fhir.org/baseR4");

    //Patients with scores of chadsvasc of 2 and a hasbled of 1
    //private final String[] demoSamplePatientIDs = 
    //{"30163", "42024", "1da75dde", "156324b", "35becbd4"};

    @GetMapping("/getPatients")
    public HashMap<String, com.backend.Patient> getData() throws IOException {
        Bundle randomPatientResponse = patientRandomSearch("2011-01-01", "Smith");
        //Bundle samplePatientResponse = samplePatientSearch();

        HashMap<String, com.backend.Patient> randomPatients = processPatients(randomPatientResponse);
        ///HashMap<String, com.backend.Patient> samplePatient = processPatients(samplePatientResponse);
        //randomPatients.putAll(samplePatient);
        calculateChadsVasc(randomPatients);
        calculateHasBled(randomPatients);
        calculateRCRIScore(randomPatients);
        return randomPatients;
    }


    //private Bundle samplePatientSearch(){

    ////    Bundle bundle = new Bundle().setType(Bundle.BundleType.SEARCHSET);

        
    //    for (String samplePatientID : demoSamplePatientIDs) {
    //        Bundle searchBundle = client.search()
    //                .forResource(Patient.class)
    //                .where(Patient.IDENTIFIER.exactly().systemAndIdentifier(null, samplePatientID))
    //                .returnBundle(Bundle.class)
    //                .execute();
    //        bundle.addEntry().setResource(searchBundle.getEntryFirstRep().getResource());
    //    }
    // System.out.println("\n CHECK OUT THIS BUNDLE: " + bundle.getEntry().get(0).getResource().toString());

    // System.out.println("Okay we just got this guy " + " " + samplePatientID + "\n");

    //return bundle;
    //}

    //This is where patient api call will be handled
    private Bundle patientRandomSearch(String birthday, String practitionerName) {
        return client.search()
		.forResource(Patient.class).count(100)
		.where(Patient.GENERAL_PRACTITIONER.hasChainedProperty(Organization.NAME.matches().value(practitionerName)))
		.returnBundle(Bundle.class)
		.execute();
    }
	//Creating the patient objects will go here. For each api call to get data (condition, encounter, etc) a new method is used	
    private HashMap<String, com.backend.Patient> processPatients(Bundle response) {
        HashSet<String> processedNames = new HashSet<>();
        HashMap<String, com.backend.Patient> patientsMap = new HashMap<>();
        int count = 0;

        for (BundleEntryComponent entry : response.getEntry()) {
            // Retrieve the patient resource from each entry
            IBaseResource resource = entry.getResource();

            // Check if the resource is of type Patient
            if (resource instanceof Patient) {
                Patient current_patient = (Patient) resource;
                String patientName = current_patient.getNameFirstRep().getNameAsSingleString();
                com.backend.Patient newPatient = new com.backend.Patient(current_patient.getNameFirstRep().getNameAsSingleString());
                newPatient.setPatientId(current_patient.getIdentifierFirstRep().toString().split("@")[1]);
                if (!processedNames.contains(patientName)) { 
                
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
                         // After all patient data is processed, evaluate RCRI values
                    //evaluateRCRIValues(current_patient, newPatient); // This evaluates the RCRI criteria based on the patient's data

                    // Then, calculate the RCRI score based on the evaluated criteria
                    processedNames.add(patientName);
                    patientsMap.put(newPatient.getPatientID(), newPatient);
                    count++;
                }
            }
            if (count == 8){
                break;
            }
        }
        return patientsMap;
    }
    private void calculateHasBled(HashMap<String, com.backend.Patient> patients) {
        for (com.backend.Patient patient : patients.values()) {
            int hasBledScore = 0;

            if (patient.hasHypertension()) {
                hasBledScore += 1;
                //System.out.println("Hyper");
            }
            if (patient.getAge() >= 65) {
                hasBledScore += 1;
                //System.out.println("Age");
            }
            if (patient.hasRenalDisease()) {
                hasBledScore += 1;
                //System.out.println("Renal");
            }
            if (patient.hasStroke()) {
                hasBledScore += 1;
                //System.out.println("Stroke");
            }
            if (patient.hasLiverDisease()) {
                hasBledScore += 1;
                //System.out.println("Liver");
            }
            if (patient.hasPriorBleeding()) {
                hasBledScore += 1;
                //System.out.println("Bleed");
            }
            if (patient.hasLabileINR()) {
                hasBledScore += 1;
                //System.out.println("INR");
            }
            if (patient.hasAspirinClopidogrelNsaid()) {
                hasBledScore += 1;
                //System.out.println("Aspirin");
            }
            if (patient.isHeavyDrinker()) {
                hasBledScore += 1;
                //System.out.println("Drinker");
            }
            System.out.println("HasBled: " + hasBledScore);
            patient.setHasBled(hasBledScore);
        }
    }


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
            patient.setChadsVasc(chadsVascScore);
        }
    }

    private void calculateRCRIScore(HashMap<String, com.backend.Patient> patients) {
        for (com.backend.Patient patient : patients.values()) {
            int rcriScore = 0;
            // High-risk surgery
            if (patient.isUndergoingHighRiskSurgery()) rcriScore++;

            // History of ischemic heart disease
            if (patient.isIschemicHeartDisease()) rcriScore++;

            // History of congestive heart failure
            if (patient.hasCHF()) rcriScore++;

            // History of cerebrovascular disease
            if (patient.isCerebrovascularDisease()) rcriScore++;

            // Diabetes mellitus on insulin
            if (patient.isOnPreOperativeInsulin()) rcriScore++;

            // Preoperative serum creatinine > 2.0 mg/dL
            if (patient.isPreOperativeCreatinineAboveTwo()) rcriScore++;

            // Set the calculated RCRI score for the patient
            patient.setRCRIScore(rcriScore);

            // Print statements for checking criteria (if needed)
            ////System.out.println("Patient ID: " + newPatient.getPatientID() + " - RCRI Criteria:");
            ////System.out.println("Undergoing High-risk Surgery: " + newPatient.isUndergoingHighRiskSurgery());
            ////System.out.println("History of Ischemic Heart Disease: " + newPatient.isIschemicHeartDisease());
            ////System.out.println("History of Congestive Heart Failure: " + newPatient.hasCHF());
            ////System.out.println("History of Cerebrovascular Disease: " + newPatient.isCerebrovascularDisease());
            ////System.out.println("Diabetes Mellitus on Insulin: " + newPatient.isOnPreOperativeInsulin());
            ////System.out.println("Preoperative Serum Creatinine > 2.0 mg/dL: " + newPatient.isPreOperativeCreatinineAboveTwo());
            ////System.out.println("Final RCRI Score: " + rcriScore + "\n");
        }  
    }
    

    // Method for adding observations
    private void addObservations(Patient current_patient, com.backend.Patient newPatient) {
        ArrayList<String> observations= new ArrayList<String>();
        for (Observation o : getResourcesForPatient(client, Observation.class, current_patient.getId())){
            observations.add(o.getCode().getText());
            getObservationValues(o,newPatient);
            //For future testing
            /*
            if (o.hasValueQuantity()) {
                System.out.println(o.getCode().getText());
                System.out.println(o.getValueQuantity().getValue());
            }
             */
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
            getConditionValues(c, newPatient);
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
            getMedicationValues(m.getText(), newPatient);
        }
        // If there are conditions add them to the patient
        if (medications.size() != 0) {
            newPatient.setMedications((String[]) medications.toArray(new String[medications.size()]));
        }
    }
    private void getConditionValues(Condition condition, com.backend.Patient newPatient) {
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
        if (codeDisplay.contains("vascular disease") || codeDisplay.contains("vasculardisease")) {
            newPatient.setVD(true);
            return;
        }
        if (codeDisplay.contains("hypertension")) {
            newPatient.setHypertension(true);
            return;
        }
        if (codeDisplay.contains("renal disease")) {
            newPatient.setRenalDisease(true);
            return;
        }
        if (codeDisplay.contains("liver disease")) {
            newPatient.setLiverDisease(true);
            return;
        }
        if (codeDisplay.contains("bleeding")) {
            newPatient.setHypertension(true);
            return;
        }
        if (codeDisplay.contains("ischemic heart disease") || codeDisplay.contains("myocardial infarction")) {
            newPatient.setIschemicHeartDisease(true);
        }
        if (codeDisplay.contains("congestive heart failure")) {
            newPatient.setCHF(true);
        }
        if (codeDisplay.contains("cerebrovascular disease") || codeDisplay.contains("stroke") || codeDisplay.contains("transient ischemic attack")) {
            newPatient.setCerebrovascularDisease(true);
        }

    }

    private void getMedicationValues(String medication, com.backend.Patient newPatient) {
        if (medication == null) {
            return;
        }
        String codeDisplay = medication.toLowerCase();
        if (codeDisplay == null) {
            return;
        }
        if (codeDisplay.contains("aspirin") || codeDisplay.contains("nsaid") || codeDisplay.contains("clopidogrel")) {
            newPatient.setAspirinClopidogrelNsaid(true);
            return;
        }
        if (codeDisplay.contains("insulin")) {
            newPatient.setOnPreOperativeInsulin(true);
        }
    }

    private void getObservationValues(Observation observation, com.backend.Patient newPatient) {
        if (observation == null) {
            return;
        }
        String codeDisplay = observation.getCode().toString().toLowerCase();
        if (codeDisplay == null) {
            return;
        }
        if (codeDisplay.contains("inr")) {
            double inrvalue = observation.hasValueQuantity() ? observation.getValueQuantity().getValue().doubleValue() : 100;
            if((inrvalue < 60 && inrvalue > 1) || (inrvalue < 0.6)) {
                newPatient.setLabileINR(true);
            }
            if(observation.hasValueRatio() && observation.getValueRatio().getNumerator().getValue().divide(observation.getValueRatio().getDenominator().getValue()).doubleValue() < 0.6) {
                newPatient.setLabileINR(true);
            }
            return;
        }
        if (((codeDisplay.contains("drinking") || codeDisplay.contains("drinker")) && codeDisplay.contains("heavy")) || (codeDisplay.contains("alcohol") && codeDisplay.contains("week") && observation.hasValueQuantity() && observation.getValueQuantity().getValue().doubleValue() >= 8)) {
            newPatient.setHeavyDrinker(true);
            return;
        }
        if (codeDisplay.contains("creatinine") && observation.hasValueQuantity()) {
            BigDecimal creatinineValue = observation.getValueQuantity().getValue();
            if (creatinineValue.compareTo(new BigDecimal("2.0")) > 0) {
                newPatient.setPreOperativeCreatinineAboveTwo(true);
            }
        }
    }
    //private void evaluateRCRIValues(Patient current_patient, com.backend.Patient newPatient) {
    //    // Conditions
    //    List<Condition> conditions = getResourcesForPatient(client, Condition.class, current_patient.getId());
    //    for (Condition condition : conditions) {
    //        if (condition.getCode().hasCoding() && condition.getCode().getCodingFirstRep().hasDisplay()) {
    //            String display = condition.getCode().getCodingFirstRep().getDisplay().toLowerCase();
    //            
    //            if (display.contains("ischemic heart disease") || display.contains("myocardial infarction")) {
    //                newPatient.setIschemicHeartDisease(true);
    //            }
    //            if (display.contains("congestive heart failure")) {
    //                newPatient.setCHF(true);
    //            }
    //            if (display.contains("cerebrovascular disease") || display.contains("stroke") || display.contains("transient ischemic attack")) {
    //                newPatient.setCerebrovascularDisease(true);
    //            }
    //        }
    //    }
    //
    //    // Medications for Diabetes on Insulin
    //    List<MedicationStatement> medicationStatements = getResourcesForPatient(client, MedicationStatement.class, current_patient.getId());
    //    for (MedicationStatement ms : medicationStatements) {
    //        if (ms.getMedicationCodeableConcept().hasText() && ms.getMedicationCodeableConcept().getText().toLowerCase().contains("insulin")) {
    //            newPatient.setOnPreOperativeInsulin(true);
    //        }
    //    }
    //
    //    // Observations for Creatinine
    //    List<Observation> observations = getResourcesForPatient(client, Observation.class, current_patient.getId());
    //    for (Observation observation : observations) {
    //        if (observation.getCode().hasCoding()) {
    //            for (Coding coding : observation.getCode().getCoding()) {
    //                if (coding.hasDisplay() && coding.getDisplay().toLowerCase().contains("creatinine") && observation.hasValueQuantity()) {
    //                    BigDecimal creatinineValue = observation.getValueQuantity().getValue();
    //                    if (creatinineValue.compareTo(new BigDecimal("2.0")) > 0) {
    //                        newPatient.setPreOperativeCreatinineAboveTwo(true);
    //                    }
    //                }
    //            }
    //        }
    //    }
    //}
    

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

package com.backend;


import ca.uhn.fhir.rest.gclient.IQuery;
import com.fasterxml.jackson.databind.ObjectMapper;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.client.api.IGenericClient;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Bundle.BundleEntryComponent;
import org.hl7.fhir.r4.model.Organization;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.DateType;
import org.hl7.fhir.r4.model.Encounter;
import org.hl7.fhir.r4.model.Enumerations;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Organization;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Practitioner;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Condition;
import org.hl7.fhir.r4.model.DateTimeType;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.instance.model.api.IIdType;

import java.io.IOException;
import java.util.Objects;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;


//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
@Component
public class GetPatientsController {

    // (malick) This main method is for testing, I put print statements in getData() and run this main method
    //public static void main(String[] args){

        //GetPatientsController test = new GetPatientsController();
       
       // try {
            //test.getData();
       // } catch (Exception e) {
            // TODO: handle exception
       // }


    //}

    @GetMapping("/getPatients")
    public HashMap<String, com.backend.Patient> getData() throws IOException {

        


        FhirContext ctx = FhirContext.forR4Cached();

        IGenericClient client = ctx.newRestfulGenericClient("https://hapi.fhir.org/baseR4");
  
		
		// Read a patient with the given ID
		//Patient patient = client.read().resource(Patient.class).withId("example").execute();
  
		// Print the output
		//String string = ctx.newJsonParser().setPrettyPrint(true).encodeResourceToString(patient);
		//System.out.println(string);

		//The following example shows how to query using the generic client:
		Bundle response = client.search()
		.forResource(Patient.class)
		.where(Patient.BIRTHDATE.beforeOrEquals().day("2011-01-01"))
		.and(Patient.GENERAL_PRACTITIONER.hasChainedProperty(
				Organization.NAME.matches().value("Smith")))
		.returnBundle(Bundle.class)
		.execute();
        //String string2 = ctx.newJsonParser().setPrettyPrint(true).encodeResourceToString(response);
        HashMap<String, com.backend.Patient> patientsMap = new HashMap<>();
        //List<String> patientNames = new ArrayList<>();
        int i = 0;

        for (BundleEntryComponent entry : response.getEntry()) {
            // Retrieve the patient resource from each entry
            IBaseResource resource = entry.getResource();

            // Check if the resource is of type Patient
            if (resource instanceof Patient) {
                Patient current_patient = (Patient) resource;

                // Access the name property
                //String familyName = patient.getNameFirstRep().getFamily();
                //String givenName = patient.getNameFirstRep().getGivenAsSingleString();

                // Concatenate family name and given name to get the full name
                //String fullName = givenName + " " + familyName;

                com.backend.Patient newPatient = new com.backend.Patient(current_patient.getNameFirstRep().getNameAsSingleString());
                newPatient.setPatientId(current_patient.getIdentifierFirstRep().toString().split("@")[1]);

                //Loops through patients observations to convert them to a readable string
                ArrayList<String> observations= new ArrayList<String>();
                for (Observation o : getObservation(current_patient.getId(), client)){
                    observations.add(o.getCode().getText());
                }
                
                // If there are observations add them to the patient
                if (observations.size() != 0) {
                    newPatient.setObservations((String[]) observations.toArray(new String[observations.size()]));
                }

                System.out.println("observations: " + observations);
                //Loops through patients conditions to convert them to a readable string
                ArrayList<String> conditions = new ArrayList<String>();
                for (Condition c : getCondition(current_patient.getId(), client)){
                    conditions.add(c.getCode().getText());
                }
                // If there are conditions add them to the patient
                if (conditions.size() != 0) {
                    newPatient.setConditions((String[]) conditions.toArray(new String[conditions.size()]));
                }

                // Add visit history
                ArrayList<String> encounterDetails = new ArrayList<>();
                for (Encounter e : getEncounters(current_patient.getId(), client)) {
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

                // Add patient practitioner
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
                        } else {
                            // Handle incorrect reference format
                            System.err.println("Incorrect practitioner reference format: " + practitionerReference);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error processing practitioner reference: " + e.getMessage());
                }
                
                patientsMap.put(newPatient.getPatientID(),newPatient);
            }
            i++;
            if (i == 10){
                break;
            }
        }
        return patientsMap;
    }

    public List<Observation> getObservation(String patientId, IGenericClient client) {
        Bundle bundle = client.search().forResource(Observation.class)
                .where(Observation.PATIENT.hasId(patientId)).returnBundle(Bundle.class).execute();
        List<Observation> observations = new ArrayList<Observation>();
        for (BundleEntryComponent entry : bundle.getEntry()) {
            IBaseResource resource = entry.getResource();
            if (resource instanceof Observation) {
                observations.add((Observation) resource);
            }
        }
        return observations;
    }
    public List<Encounter> getEncounters(String patientId, IGenericClient client) {
        Bundle bundle = client.search().forResource(Encounter.class)
                .where(Encounter.PATIENT.hasId(patientId)).returnBundle(Bundle.class).execute();
        List<Encounter> encounters = new ArrayList<>();
        for (BundleEntryComponent entry : bundle.getEntry()) {
            IBaseResource resource = entry.getResource();
            if (resource instanceof Encounter) {
                encounters.add((Encounter) resource);
            }
        }
        return encounters;
    }
    public List<Condition> getCondition(String patientId, IGenericClient client) {
        Bundle bundle = client.search().forResource(Condition.class)
                .where(Observation.PATIENT.hasId(patientId)).returnBundle(Bundle.class).execute();
        List<Condition> conditions = new ArrayList<Condition>();
        for (BundleEntryComponent entry : bundle.getEntry()) {
            IBaseResource resource = entry.getResource();
            if (resource instanceof Condition) {
                conditions.add((Condition) resource);
            }
        }
        return conditions;
    }
		//System.out.println(string2);

         //Map<String,Object> map = new HashMap<>();

         //map.put(string2, "thing");


        // for( Bundle.BundleEntryComponent i : response.getEntry()){
        //     Patient person = (Patient) i.getResource();
        //     System.out.println("name: " + person.getName().get(0));
            

        //   Bundle ressponse =  client.search()
        //     .forResource(Practitioner.class)
        //     .where(Practitioner.IDENTIFIER.exactly().code(person.getGeneralPractitionerFirstRep().getId())).returnBundle(Bundle.class).execute();

        //     		String string22 = ctx.newJsonParser().setPrettyPrint(true).encodeResourceToString(ressponse);
        //             		System.out.println(string22);




        // }


        // System.out.println("YEAH I JUST GOT CALLED");
        // ObjectMapper objectMapper = new ObjectMapper();
        // Map<String,Object> map = new HashMap<>();


        // Resource resource = new ClassPathResource("patientA.json");
        // Map<String, Object> data = objectMapper.readValue(resource.getInputStream(), Map.class);
        // ArrayList<LinkedHashMap> address = (ArrayList) data.get("address");
        // ArrayList<LinkedHashMap> name = (ArrayList) data.get("name");
        // Patient patientA = new Patient(formatName(name), address.get(0).get("text").toString());
        // map.put(patientA.getName(), patientA);

        // resource = new ClassPathResource("patientB.json");
        // data = objectMapper.readValue(resource.getInputStream(), Map.class);
        // address = (ArrayList) data.get("address");
        // name = (ArrayList) data.get("name");
        // Patient patientB = new Patient(formatName(name), address.get(0).get("text").toString());
        // map.put(patientB.getName(), patientB);

        // resource = new ClassPathResource("patientC.json");
        // data = objectMapper.readValue(resource.getInputStream(), Map.class);
        // address = (ArrayList) data.get("address");
        // name = (ArrayList) data.get("name");
        // Patient patientC = new Patient(formatName(name), address.get(0).get("text").toString());
        // map.put(patientC.getName(), patientC);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

        // System.out.println(address.get(0).get("text"));
        // System.out.println(formatName(name));

        // System.out.println(map);
        
        //return map;
    //}

    //private String formatName(ArrayList<LinkedHashMap> data) {

        //return (data.get(0).get("given").toString()).replaceAll("\\[","").replaceAll("\\]", "").replaceAll(",", "") +" "+  data.get(0).get("family");
   // }


}
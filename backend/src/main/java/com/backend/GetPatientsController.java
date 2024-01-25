package com.backend;


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
import org.hl7.fhir.r4.model.Enumerations;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Organization;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Practitioner;
import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.instance.model.api.IIdType;
import org.hl7.fhir.r4.model.Reference;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
    public List<com.backend.Patient> getData() throws IOException {

        


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
        List<com.backend.Patient> protoPatients = new ArrayList<>();
        //List<String> patientNames = new ArrayList<>();
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



                com.backend.Patient protoPatient = new com.backend.Patient(current_patient.getNameFirstRep().getNameAsSingleString());

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
                                protoPatient.setGeneralPractitioner(fullName);
                            }
                        } else {
                            // Handle incorrect reference format
                            System.err.println("Incorrect practitioner reference format: " + practitionerReference);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error processing practitioner reference: " + e.getMessage());
                }
                protoPatients.add(protoPatient);
            }

        }
        return protoPatients;
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
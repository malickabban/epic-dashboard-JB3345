package com.jd3345.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import ca.uhn.fhir.context.FhirContext;
// import ca.uhn.fhir.rest.api.MethodOutcome;
// import ca.uhn.fhir.rest.client.api.IGenericClient;
// import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;
// import org.hl7.fhir.r4.model.DateType;
// import org.hl7.fhir.r4.model.Enumerations;
// import org.hl7.fhir.r4.model.Patient;
// import org.hl7.fhir.instance.model.api.IIdType;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}

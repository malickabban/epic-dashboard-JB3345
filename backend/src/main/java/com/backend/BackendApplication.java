package com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ca.uhn.fhir.context.FhirContext;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		FhirContext ctx = FhirContext.forR4Cached();
		SpringApplication.run(BackendApplication.class, args);
	}

}

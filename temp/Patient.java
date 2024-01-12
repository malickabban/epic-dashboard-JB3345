package com.jd3345.backend;
import java.util.HashMap;

//https://build.fhir.org/patient-example.html as an example of the
//types of .json files we will be parsing

public class Patient {
    //private String[] usualName, officialName, maidenName; 
    private String name; // Different names defined in the patient file
    private String address; //index of preferred name

    private boolean active, deceased;

    public Patient(String name, String address){
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

}

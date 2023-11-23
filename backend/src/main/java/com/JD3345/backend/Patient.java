package com.JD3345.backend;
import java.util.HashMap;

//https://build.fhir.org/patient-example.html as an example of the
//types of .json files we will be parsing

public class Patient {
    //private String[] usualName, officialName, maidenName; 
    private HashMap<String,String> names; // Different names defined in the patient file
    private int preferred; //index of preferred name

    private boolean active, deceased;

}

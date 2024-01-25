package com.backend;

import java.util.List;

public class Patient {

    private String name, general_practitioner;
    private int patient_id;
    private boolean deceased;

    public Patient(String name){
        this.name = name;
    }

    // Getter methods
    public String getName(){
        return name;
    }

    public String getGeneralPractitioner(){
        return general_practitioner;
    }

    public int getPatientID(){
        return patient_id;
    }

    public boolean isDeceased(){
        return deceased;
    }


    // Setter methods
    public void setName(String name) {
        this.name = name;
    }

    public void setGeneralPractitioner(String general_practitioner) {
        this.general_practitioner = general_practitioner;
    }

    public void setPatientId(int patient_id) {
        this.patient_id = patient_id;
    }

    public void setDeceased(boolean deceased) {
        this.deceased = deceased;
    }
}





    


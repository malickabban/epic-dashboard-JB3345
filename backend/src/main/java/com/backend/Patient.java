package com.backend;

public class Patient {

    private String name, general_practitioner;
    private String patient_id;
    private boolean deceased;
    public String[] conditions;
    public String[] observations;
    public String[] encounters;
    public String[] medications;

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

    public String getPatientID(){
        return patient_id;
    }

    public boolean isDeceased(){
        return deceased;
    }
    public String[] getConditions() {
        return conditions;
    }
    public String[] getObservations() {
        return observations;
    }
    public String[] getEncounters() {
        return encounters;
    }
    public String[] getMedications() {
        return medications;
    }


    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    public void setConditions(String[] conditions) {
        this.conditions = conditions;
    }
    public void setEncounters(String[] encounters) {
        this.encounters = encounters;
    }
    public void setObservations(String[] observations) {
        this.observations = observations;
    }
    public void setMedications(String[] medications) {
        this.medications = medications;
    }
    public void setGeneralPractitioner(String general_practitioner) {
        this.general_practitioner = general_practitioner;
    }

    public void setPatientId(String patient_id) {
        this.patient_id = patient_id;
    }

    public void setDeceased(boolean deceased) {
        this.deceased = deceased;
    }
}
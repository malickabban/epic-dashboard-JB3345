package com.backend;

public class Patient {

    private int age = 0;
    private String name, general_practitioner;
    private String patient_id;
    private boolean deceased;
    private String gender;
    private int chadsvasc;
    private int RCRI;
    private boolean CHF = false;
    private boolean stroke = false;
    private boolean diabetes = false;
    private boolean VD = false;
    private boolean hypertension = false;
    private boolean ischemicHeartDisease = false;
    private boolean cerebrovascularDisease = false;
    private boolean onPreOperativeInsulin = false;
    private boolean undergoingHighRiskSurgery = false;
    private boolean preOperativeCreatinineAboveTwo = false;

    public String[] conditions;
    public String[] observations;
    public String[] encounters;
    public String[] medications;


    public Patient(String name){
        this.name = name;
    }

    // Getter methods

    public boolean isIschemicHeartDisease() {
        return ischemicHeartDisease;
    }
    // Getter and setter for Cerebrovascular Disease
    public boolean isCerebrovascularDisease() {
        return cerebrovascularDisease;
    }
    // Getter and setter for On Pre-Operative Insulin
    public boolean isOnPreOperativeInsulin() {
        return onPreOperativeInsulin;
    }
    // Getter and setter for Undergoing High Risk Surgery
    public boolean isUndergoingHighRiskSurgery() {
        return undergoingHighRiskSurgery;
    }
    // Getter and setter for Pre-Operative Creatinine Above Two
    public boolean isPreOperativeCreatinineAboveTwo() {
        return preOperativeCreatinineAboveTwo;
    }
    public boolean hasCHF() {
        return CHF;
    }
    public boolean hasStroke() {
        return stroke;
    }
    public boolean hasDiabetes() {
        return diabetes;
    }
    public boolean hasVD() {
        return VD;
    }
    public boolean hasHypertension() {
        return hypertension;
    }
    public int getAge() {
        return age;
    }
    public String getGender() {
        return gender;
    }
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
    public void setAge(int age) {
        this.age = age;
    }

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

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setCHF(boolean CHF) {
        this.CHF = CHF;
    }
    public void setStroke(boolean stroke) {
        this.stroke = stroke;
    }
    public void setDiabetes(boolean diabetes) {
        this.diabetes = diabetes;
    }
    public void setVD(boolean VD) {
        this.VD = VD;
    }
    public void setHypertension(boolean hypertension) {
        this.hypertension = hypertension;
    }
    public void setChadsVasc(int chadsvasc) {
        this.chadsvasc = chadsvasc;
    }
    public void setRCRIScore(int RCRI) {
        this.RCRI = RCRI;
    }

    public void setIschemicHeartDisease(boolean ischemicHeartDisease) {
        this.ischemicHeartDisease = ischemicHeartDisease;
    }

    public void setCerebrovascularDisease(boolean cerebrovascularDisease) {
        this.cerebrovascularDisease = cerebrovascularDisease;
    }

    public void setOnPreOperativeInsulin(boolean onPreOperativeInsulin) {
        this.onPreOperativeInsulin = onPreOperativeInsulin;
    }


    public void setUndergoingHighRiskSurgery(boolean undergoingHighRiskSurgery) {
        this.undergoingHighRiskSurgery = undergoingHighRiskSurgery;
    }

    public void setPreOperativeCreatinineAboveTwo(boolean preOperativeCreatinineAboveTwo) {
        this.preOperativeCreatinineAboveTwo = preOperativeCreatinineAboveTwo;
    }
}
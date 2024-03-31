package com.backend;

public class Patient {

    public int age = 0;
    public String name, general_practitioner;
    public String patient_id;
    public boolean deceased;
    public String gender;
    public String diagnosisNote = "";
    public String hasBledDiagnosisNote = "";
    public String chadsvascDiagnosisNote = "";
    public String RCRIdiagnosisNote = "";
    public int chadsvasc;
    public int hasBled;
    public int RCRI;
    public boolean CHF;
    public boolean stroke;
    public boolean diabetes;
    public boolean VD;
    public boolean hypertension;
    public boolean aspirinClopidogrelNsaid;
    public boolean renalDisease;
    public boolean liverDisease;
    public boolean priorBleeding;
    public boolean heavyDrinker;
    public boolean labileINR;
    public boolean ischemicHeartDisease;
    public boolean cerebrovascularDisease;
    public boolean onPreOperativeInsulin;
    public boolean undergoingHighRiskSurgery;
    public boolean preOperativeCreatinineAboveTwo;

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
    public String getDiagnosisNote() {
        return diagnosisNote;
    }
    public String getHasBledDiagnosisNote() {
        return hasBledDiagnosisNote;
    }
    public String getChadvascDiagnosisNote() {
        return chadsvascDiagnosisNote;
    }
    public String getRCRIDiagnosisNote() {
        return RCRIdiagnosisNote;
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
    public boolean hasAspirinClopidogrelNsaid(){
        return aspirinClopidogrelNsaid;
    }
    public boolean hasRenalDisease() {
        return renalDisease;
    }
    public boolean hasLiverDisease() {
        return liverDisease;
    }
    public boolean hasPriorBleeding() {
        return priorBleeding;
    }
    public boolean hasLabileINR() {
        return labileINR;
    }
    public int getHasBled() {
        return hasBled;
    }
    public boolean isHeavyDrinker() {
        return heavyDrinker;
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
    public void addNote(String note) {
        diagnosisNote = diagnosisNote.concat(note);
        diagnosisNote = diagnosisNote.concat("\n");
    }
    public void addRCRINote(String note) {
        RCRIdiagnosisNote = RCRIdiagnosisNote.concat(note);
        RCRIdiagnosisNote = RCRIdiagnosisNote.concat("\n");
    }    public void addChadsvascNote(String note) {
        chadsvascDiagnosisNote = chadsvascDiagnosisNote.concat(note);
        chadsvascDiagnosisNote = chadsvascDiagnosisNote.concat("\n");
    }    public void addHasBledNote(String note) {
        hasBledDiagnosisNote = hasBledDiagnosisNote.concat(note);
        hasBledDiagnosisNote = hasBledDiagnosisNote.concat("\n");
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
    public void setAspirinClopidogrelNsaid(boolean acn){
        aspirinClopidogrelNsaid = acn;
    }
    public void setRenalDisease(boolean rd) {
        renalDisease = rd;
    }
    public void setLiverDisease(boolean ld) {
        liverDisease = ld;
    }
    public void setPriorBleeding(boolean pb) {
        priorBleeding = pb;
    }
    public void setHeavyDrinker(boolean heavyDrinker) {
        this.heavyDrinker = heavyDrinker;
    }
    public void setLabileINR(boolean labileINR) {this.labileINR = labileINR;}
    public void setChadsVasc(int chadsvasc) {
        this.chadsvasc = chadsvasc;
    }
    public void setHasBled(int hasBled) {this.hasBled = hasBled;}
    
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
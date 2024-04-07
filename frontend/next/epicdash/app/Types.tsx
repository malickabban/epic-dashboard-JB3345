// Define the structure of your JSON data here. 
// Needs to be better for all of the score information because it is too messy.
export type Patient = {
    deceased: boolean;
    name: string;
    patientID: string;
    generalPractitioner: string | null;
    conditions : string[] | null;

    chadsvascDiagnosisNote: string[] | null;
    hasBledDiagnosisNote: string[] | null;
    RCRIdiagnosisNote: string[] | null;
    observations : string[] | null;
    encounters : string[] | null;
    age: number | null;
    gender: string | null;
    rcri: number | null;
    chadsvasc: number | null;
    CHF: boolean | null;
    hypertension : boolean | null;
    stroke : boolean | null;
    VD : boolean | null;
    diabetes : boolean | null;
    undergoingHighRiskSurgery : boolean | null;
    preOperativeCreatinineAboveTwo: boolean | null;
    onPreOperativeInsulin: boolean | null;
    ischemicHeartDisease: boolean | null;
    cerebrovascularDisease: boolean | null;
    renalDisease : boolean | null;
    liverDisease : boolean | null;
    priorBleeding : boolean | null;
    inr : boolean | null;
    medicationBleeds : boolean | null;
    alcoholUse : boolean | null;
    hasBled : number | null;
    diagnosisNote: string[] | null;
};
//Access each patient by patientID string
export type PatientMap = Record<string, Patient>;
//Function to clone each patient.
export const clonePatient = (data : Patient) => {
    let diagnoses = null
    if (data && typeof data.diagnosisNote === "string") {
        const str: string = data.diagnosisNote;
        diagnoses = str.split("\n");
    }
    const t:Patient = {
      name: data.name,
      deceased: data.deceased,
      generalPractitioner: data.generalPractitioner,
      chadsvascDiagnosisNote: data.chadsvascDiagnosisNote,
      RCRIdiagnosisNote: data.RCRIdiagnosisNote,
      hasBledDiagnosisNote: data.hasBledDiagnosisNote,
      patientID: data.patientID,
      conditions: data.conditions,
      observations: data.observations,
      encounters: data.encounters,
      age: data.age,
      gender: data.gender,
      chadsvasc: 'chadsvasc' in data ? data.chadsvasc : null,
      rcri: 'rcri' in data ? data.rcri : null,
      CHF: 'CHF' in data ? data.CHF : null,
      hypertension: 'hypertension' in data ? data.hypertension : null,
      diabetes: 'diabetes' in data ? data.diabetes : null,
      VD : 'VD' in data ? data.VD : null,
      stroke : 'stroke' in data ? data.stroke : null,
      undergoingHighRiskSurgery : data.undergoingHighRiskSurgery,
      preOperativeCreatinineAboveTwo: data.preOperativeCreatinineAboveTwo,
      onPreOperativeInsulin: data.onPreOperativeInsulin,
      ischemicHeartDisease: data.ischemicHeartDisease,
      cerebrovascularDisease: data.cerebrovascularDisease,
      renalDisease : 'renalDisease' in data ? data.renalDisease : null,
      liverDisease : 'liverDisease' in data ? data.liverDisease : null,
      priorBleeding : 'priorBleeding' in data ? data.priorBleeding : null,
      inr : 'inr' in data ? data.inr : null,
      medicationBleeds : 'medicationBleeds' in data ? data.medicationBleeds : null,
      alcoholUse : 'alcoholUse' in data ? data.alcoholUse : null,
      hasBled : 'hasBled' in data ? data.hasBled : null,
      diagnosisNote : diagnoses ? diagnoses : data.diagnosisNote
    } 
    return t;
}
//This is for each score with all of the information for each score.
//Will need to improve this in the future so it isn't so messy.
export type Scores = {
    name : string,
    score : number | null,
    fields: string[],
    elements: number[]
}
    
//This is the scoreMap which maps each score name to a score.
export type scoreMap = Record<string, Scores>
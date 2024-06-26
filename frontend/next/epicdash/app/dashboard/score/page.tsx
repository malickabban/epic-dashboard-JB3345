"use client"
import styles from "./PatientScore.module.css"
import SearchBar from "./SearchBar";
import { useState, useEffect, useContext } from 'react'
import {PatientContext, patientContextType} from '../../PatientContext'
import type {Patient, scoreMap} from "../../Types";


const PatientScore = () => {
  //Manually calculate age score because not passed in.
  const chadsvascAge = (patient : Patient) => {
    if (patient.age && patient.age >= 65 && patient.age <= 74) {
      return 1;
    } else if (patient.age && patient.age >= 75) {
      return 2;
    } else {
      return 0;
    }
  }
  const {selectedPatient} = useContext(PatientContext) as patientContextType

  //Stuff that needs to be fixed in the future. Really messy stuff. Might consider having all of this
  // stuff present from the frontend instead of having to parse it all in the frontend.
  const [current, setCurrent] = useState<scoreMap>({"CHA2DS2-VASc" : {name : "CHA2DS2-VASc", score : selectedPatient ? selectedPatient.chadsvasc : 0, 
  fields : ["Age", "CHF","Hypertension","Gender", "Stroke", "VD","Diabetes","Score"], 
  elements : [selectedPatient ? chadsvascAge(selectedPatient) : 0, selectedPatient && selectedPatient.CHF ? 1 : 0, selectedPatient && selectedPatient.hypertension ? 1 : 0, 
    selectedPatient && selectedPatient.gender === 'female' ? 1 : 0, selectedPatient && selectedPatient.stroke ? 2 : 0, selectedPatient && selectedPatient.VD ? 1 : 0,
    selectedPatient && selectedPatient.diabetes ? 1 : 0, selectedPatient && selectedPatient.chadsvasc ? selectedPatient.chadsvasc : 0]},
   "RCRI" : {name : "RCRI", score : selectedPatient ? selectedPatient.rcri : 0, 
   fields : ["CVD", "IHD", "Elevated Surgery Risk", "CHF", "Pre-operative Insulin", "Pre-operative Creatinine", "Score"], 
    elements : [selectedPatient && selectedPatient.cerebrovascularDisease ? 1 : 0, selectedPatient && selectedPatient.ischemicHeartDisease ? 1 : 0, selectedPatient && selectedPatient.undergoingHighRiskSurgery ? 1 : 0, 
      selectedPatient && selectedPatient.CHF ? 1 : 0, selectedPatient && selectedPatient.onPreOperativeInsulin ? 1 : 0, selectedPatient && selectedPatient.preOperativeCreatinineAboveTwo ? 1 : 0, 
      selectedPatient && selectedPatient.rcri ? selectedPatient.rcri : 0]},
      "HAS-BLED" : {name : "HAS-BLED", score : selectedPatient ? selectedPatient.hasBled : 0, 
      fields : ["Age", "Renal Disease","Hypertension","Liver Disase", "Stroke", "Prior Bleeding","INR","Alcohol Use","Medications","Score"], 
      elements : [selectedPatient && chadsvascAge(selectedPatient) >= 1 ? 1 : 0, selectedPatient && selectedPatient.renalDisease ? 1 : 0, selectedPatient && selectedPatient.hypertension ? 1 : 0, 
        selectedPatient && selectedPatient.liverDisease ? 1: 0, selectedPatient && selectedPatient.stroke ? 1 : 0, selectedPatient && selectedPatient.priorBleeding ? 1 : 0,
        selectedPatient && selectedPatient.inr ? 1 : 0, selectedPatient && selectedPatient.alcoholUse ? 1 : 0, selectedPatient && selectedPatient.medicationBleeds ? 1 : 0, selectedPatient && selectedPatient.hasBled ? selectedPatient.hasBled : 0]}})
  //Stuff that needs to be fixed in the future. Really messy stuff. Might consider having all of this
  // stuff present from the frontend instead of having to parse it all in the frontend.

  const [names, setNames] = useState<scoreMap>({"CHA2DS2-VASc" : {name : "CHA2DS2-VASc", score : selectedPatient ? selectedPatient.chadsvasc : 0, 
  fields : ["Age", "CHF","Hypertension","Gender", "Stroke", "VD","Diabetes","Score"], 
  elements : [selectedPatient ? chadsvascAge(selectedPatient) : 0, selectedPatient && selectedPatient.CHF ? 1 : 0, selectedPatient && selectedPatient.hypertension ? 1 : 0, 
    selectedPatient && selectedPatient.gender === 'female' ? 1 : 0, selectedPatient && selectedPatient.stroke ? 2 : 0, selectedPatient && selectedPatient.VD ? 1 : 0,
    selectedPatient && selectedPatient.diabetes ? 1 : 0, selectedPatient && selectedPatient.chadsvasc ? selectedPatient.chadsvasc : 0]},
   "RCRI" : {name : "RCRI", score : selectedPatient ? selectedPatient.rcri : 0, 
   fields : ["CVD", "IHD", "Elevated Surgery Risk", "CHF", "Pre-operative Insulin", "Pre-operative Creatinine", "Score"], 
    elements : [selectedPatient && selectedPatient.cerebrovascularDisease ? 1 : 0, selectedPatient && selectedPatient.ischemicHeartDisease ? 1 : 0, selectedPatient && selectedPatient.undergoingHighRiskSurgery ? 1 : 0, 
      selectedPatient && selectedPatient.CHF ? 1 : 0, selectedPatient && selectedPatient.onPreOperativeInsulin ? 1 : 0, selectedPatient && selectedPatient.preOperativeCreatinineAboveTwo ? 1 : 0, 
      selectedPatient && selectedPatient.rcri ? selectedPatient.rcri : 0]},
      "HAS-BLED" : {name : "HAS-BLED", score : selectedPatient ? selectedPatient.hasBled : 0, 
      fields : ["Age", "Renal Disease","Hypertension","Liver Disase", "Stroke", "Prior Bleeding","INR","Alcohol Use","Medications","Score"], 
      elements : [selectedPatient && chadsvascAge(selectedPatient) >= 1 ? 1 : 0, selectedPatient && selectedPatient.renalDisease ? 1 : 0, selectedPatient && selectedPatient.hypertension ? 1 : 0, 
        selectedPatient && selectedPatient.liverDisease ? 1: 0, selectedPatient && selectedPatient.stroke ? 1 : 0, selectedPatient && selectedPatient.priorBleeding ? 1 : 0,
        selectedPatient && selectedPatient.inr ? 1 : 0, selectedPatient && selectedPatient.alcoholUse ? 1 : 0, selectedPatient && selectedPatient.medicationBleeds ? 1 : 0, selectedPatient && selectedPatient.hasBled ? selectedPatient.hasBled : 0]}})

  const [searchValue, setSearchValue] = useState('');
  const [name, setName] = useState<string | null>(selectedPatient ? selectedPatient.name : "");
  const [selected, setSelected] = useState(selectedPatient);
  const {scores, setScores} = useContext(PatientContext) as patientContextType

  //Change search dropdown while searching
  useEffect(() => {
    if (searchValue === "") {
      setCurrent(names);
    } else {
      const thing:scoreMap = {};
      if (names) {
        Object.keys(names).forEach((key) => {
          if (names[key].name.toLowerCase().includes(searchValue.toLowerCase())) {
            thing[key] = names[key];
          }
        });
      }
      setCurrent(thing || null);
    }
  },[searchValue]);

  //Change search value based on typing.
  const onSearch = (value: string) => {
    setSearchValue(value)
  }

  //Adds the table to the searchable values.
  const onAdd = () => {
    if (searchValue in names && selected) {
      if (scores) {
        const thing : scoreMap = {};
        Object.keys(scores).map((key) => thing[key] = scores[key])
        thing[searchValue] = names[searchValue];
        setScores(thing);
      } else {
        const thing : scoreMap = {};
        thing[searchValue] = names[searchValue];
        setScores(thing);
      }
    }
  }

  //Deletes score based on current search value.
  const handleDelete = () => {
    if (selected && scores && searchValue in scores) {
      const updatedScores = { ...scores };
      delete updatedScores[searchValue];
      setScores(updatedScores);
    }
  };
  
  return (
    <div className={styles.container}>
      <h4>{name}</h4>
      <div className={styles.top}>
        <SearchBar placeholder="Search Patient Score..." onSearch={onSearch} current={current}/>
        <button className={styles.addButton} onClick={onAdd}>Add</button>
        <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
      </div>
      {scores && Object.keys(scores).map((key) => (
        <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.tf}>{key}</th>
          {scores[key].fields && scores[key].fields.map((item : string) =>
            <th className={styles.td}>{item}</th>
          )}
        </tr>
        </thead>
        <tbody>
        <tr>
          <th className={styles.tf}>Breakdown: </th>
          {scores[key].elements && scores[key].elements.map((item : number) =>
            <th className={styles.td}>{item}</th>
          )}
        </tr>
        </tbody>
        </table>
      ))}
    </div>
  );
};

export default PatientScore;
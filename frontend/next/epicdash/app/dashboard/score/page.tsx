"use client"
import styles from "./PatientScore.module.css"
import SearchBar from "./SearchBar";
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useContext } from 'react'
import {PatientContext, patientContextType} from '../../PatientContext'
import Patient from "../patient/page";
export type Scores = {
  name : string,
  score : number | null
}
export type scoreMap = Record<string, Scores>
const PatientScore = () => {
  const {selectedPatient} = useContext(PatientContext) as patientContextType
  const [current, setCurrent] = useState<scoreMap>({"CHA2DS2-VASc" : {name : "CHA2DS2-VASc", score : selectedPatient ? selectedPatient.chadsvasc : 0}, "RCRI" : {name : "RCRI", score : selectedPatient ? selectedPatient.rcri : 0}})
  const [names, setNames] = useState<scoreMap>({"CHA2DS2-VASc" : {name : "CHA2DS2-VASc", score : selectedPatient ? selectedPatient.chadsvasc : 0}, "RCRI" : {name : "RCRI", score : selectedPatient ? selectedPatient.rcri : 0}})
  const [searchValue, setSearchValue] = useState('');
  const [name, setName] = useState<string | null>(selectedPatient ? selectedPatient.name : "");
  const [selected, setSelected] = useState(selectedPatient);
  const {scores, setScores} = useContext(PatientContext) as patientContextType
  useEffect(() => {
    //Change search dropdown while searching
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
  const onSearch = (value: string) => {
    // search value when Enter is pressed
    setSearchValue(value)
  }
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
  return (
    <div className={styles.container}>
      <h4>{name}</h4>
      <div className={styles.top}>
        <SearchBar placeholder="Search Patient Score..." onSearch={onSearch} current={current}/>
        <button className={styles.addButton} onClick={onAdd}>Add</button>
      </div>
      <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      {scores && Object.keys(scores).map((key) => (
        <tr>
          <th>{key}</th>
          <th>{scores[key].score}</th>
        </tr>
      ))}
      </tbody>
      </table>
    </div>
  );
};

export default PatientScore;
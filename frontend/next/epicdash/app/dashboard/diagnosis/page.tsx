"use client"
import styles from "./Diagnosis.module.css"
import SearchBar from "./SearchBar";
import { useState, useEffect, useContext } from 'react'
import {PatientContext, patientContextType} from '../../PatientContext'
import { HiOutlineDocumentDuplicate  } from "react-icons/hi";

const Diagnosis = () => {
  const {selectedPatient} = useContext(PatientContext) as patientContextType
  const [searchValue, setSearchValue] = useState('');
  const [diagnoses, setDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);
  const [originalDiagnoses, setOriginalDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);

  //For copying to clipboard
  const handleCopy = async (key: string) => {
    try {
        if (key) {
            await navigator.clipboard.writeText(key);
        }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  useEffect(() => {
    if (searchValue === "") {
      setDiagnoses(originalDiagnoses);
    } else {
      const thing: string[] = [];
      if (originalDiagnoses) {
        originalDiagnoses.forEach((key) => {
          if (key.toLowerCase().includes(searchValue.toLowerCase())) {
            thing.push(key);
          }
        });
      }
      setDiagnoses(thing || null);
    }
  },[searchValue]);

  //Change search value based on typing.
  const onSearch = (value: string) => {
    setSearchValue(value)
  }
  return (
    <div className={styles.container}>
      <h4>{selectedPatient && selectedPatient.name}</h4>
      <SearchBar placeholder="Search Diagnosis..." onSearch={onSearch} diagnoses={diagnoses}/>
      {diagnoses && diagnoses.map((key, index) => key !== "" &&
      <div className="mt-2 card p-3 flex flex-row justify-between">
      <p key={key + index}>{key}</p>
      <HiOutlineDocumentDuplicate className="mr-2 mt-1" onClick= {() => handleCopy(key)}/>
      </div>)}
    </div>
  );
};

export default Diagnosis;
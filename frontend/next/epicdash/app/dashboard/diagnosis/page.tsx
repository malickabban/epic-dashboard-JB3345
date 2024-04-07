"use client"
import styles from "./Diagnosis.module.css"
import SearchBar from "./SearchBar";
import { useState, useEffect, useContext } from 'react'
import { PatientContext, patientContextType } from '../../PatientContext'
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

const Diagnosis = () => {
  const { selectedPatient } = useContext(PatientContext) as patientContextType;
  const [searchValue, setSearchValue] = useState('');
  const [diagnoses, setDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);
  const [originalDiagnoses, setOriginalDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);
  const [searched, setSearched] = useState(false); // New state to track if search has been performed

  // For copying to clipboard
  const handleCopy = async (key: string) => {
    try {
      if (key) {
        await navigator.clipboard.writeText(key);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    if (searchValue === '') {
      setDiagnoses(originalDiagnoses);
      setSearched(false); // Reset searched state when search value is cleared
    } else {
      const filteredDiagnoses = originalDiagnoses
        ? originalDiagnoses.filter(diagnosis => diagnosis.toLowerCase().includes(searchValue.toLowerCase()))
        : null;
      setDiagnoses(filteredDiagnoses);
      setSearched(true); // Set searched state to true when search is performed
    }
  }, [searchValue, originalDiagnoses]);

  // Change search value based on typing.
  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleAddNote = (note: string) => {

  };

  const onAdd = () => {

  }

  const handleDelete = () => {

  };

  return (
    <div className={styles.container}>
      <h4>{selectedPatient && selectedPatient.name}</h4>
      <div className="flex justify-between items-center mr-4">
      
      <SearchBar placeholder="Search Diagnosis..." onSearch={onSearch} diagnoses={diagnoses} />
      
      </div>
      {searched && diagnoses && diagnoses.length === 0 && <p>No matching diagnoses found.</p>}
      {searched &&
        diagnoses &&
        diagnoses.length > 0 &&
        diagnoses.map((key, index) => key !== '' && (
          <div className="mt-2 card p-3 flex flex-row justify-between" key={key + index}>
            <p>{key}</p>
            {/* Add button next to each note */}
            <button className={styles.addButton} onClick={onAdd}>Add</button>
            <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
            <div>
            <HiOutlineDocumentDuplicate className="mr-8 mt-8 w-8 h-8" onClick={() => handleCopy(key)} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Diagnosis;
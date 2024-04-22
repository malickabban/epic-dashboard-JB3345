"use client";
import React from "react";
import type {Patient} from "../../Types"
import { useState, useEffect, useContext } from 'react'
import { HiPlus, HiMinus, HiOutlineDocumentDuplicate  } from "react-icons/hi";
import DiagnosisSearchBar from "./DiagnosisSearchBar";
import {PatientContext, patientContextType} from '../../PatientContext'

export type notesInput = {
    notesActive: boolean,
    selectedPatient: Patient | null,
    setNotesActive: (value:boolean) => void
}


//Notes card for dashboard page
const Notes = (input: notesInput) => {
    const {notesActive, selectedPatient, setNotesActive} = input;
    const [searchValue, setSearchValue] = useState('');
    const [diagnoses, setDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);
    const [originalDiagnoses, setOriginalDiagnoses] = useState<string[] | null>(selectedPatient ? selectedPatient.diagnosisNote : null);
    const [searched, setSearched] = useState(false); // New state to track if search has been performed
    const {added, setAdded} = useContext(PatientContext) as patientContextType

    const handleCopy = async () => {
        try {
            if (added && typeof added.toString() === "string") {
                await navigator.clipboard.writeText(added.toString());
            }
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
      const handleCopy2 = async (input : string) => {
        try {
          if (input) await navigator.clipboard.writeText(input);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
      useEffect(() => {
        if (selectedPatient && !originalDiagnoses) {
          setOriginalDiagnoses(selectedPatient.diagnosisNote);
        }
      }, [selectedPatient]);

      useEffect(() => {
        if (searchValue === '') {
          setDiagnoses(originalDiagnoses);
          setSearched(false); // Reset searched state when search value is cleared
        } else {
          const filteredDiagnoses = originalDiagnoses
            ? originalDiagnoses.filter((diagnosis : string) => diagnosis.split(" ")[0].toLowerCase().includes(searchValue.split(" ")[0].toLowerCase()))
            : null;
          setDiagnoses(filteredDiagnoses);
          setSearched(true); // Set searched state to true when search is performed
        }
      }, [searchValue, originalDiagnoses]);

      const onSearch = (value: string) => {
        setSearchValue(value);
      };
      const onAdd = () => {
        if (added && diagnoses) {
          const s = diagnoses.find((element: string) => element.split(" ")[0] === searchValue);
          if (typeof s === "string" && !(added.includes(s))) {
            let bum = [];
            added.forEach(element => bum.push(element));
            bum.push(s);
            setAdded(bum);
          }
        }
      };
      const handleDelete = (key: string) => {
        if (added && diagnoses) {
          let bum:string [] = [];
          added.forEach(element => bum.push(element));
          delete bum[bum.indexOf(key)];
          setAdded(bum);
        }
      };

    return (
        <div className="col-span card shadow-md my-4 flex flex-col">
          <div className="flex flex-row justify-between">
            <h4 className="bg-[var(--bg)] text-[var(--text)] p-2 ml-2 rounded">Diagnostic Notes</h4>
            <div className="flex flex-row">
            <HiOutlineDocumentDuplicate className="mr-2 mt-1" onClick={handleCopy}/>
            {notesActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("notesCard");
                if (item && selectedPatient) item.style.display = "block";
                setNotesActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("notesCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setNotesActive(true);
                  }}
              />
                }
                </div>
                </div>
                {!notesActive &&    
            <div id="notesCard">
            <div className="flex flex-row mb-2 justify-between">
            <div className="ml-2">
              <DiagnosisSearchBar placeholder="Search Diagnosis..." onSearch={onSearch} diagnoses={diagnoses} />
            </div>
            <button className="bg-[#3a34a3] text-[var(--text)] mr-2 cursor-auto p-2.5 rounded-[10px] border-[none]" onClick={onAdd}>Add</button>
            {searched && diagnoses && diagnoses.length === 0 && <p>No matching diagnoses found.</p>}
          </div>
            <div className="flex flex-row">
                <div className="flex flex-col">
                {added && added.map((key, index) => key !== '' && (
          <div className="m-2 card p-3 flex flex-row justify-between" key={key + index}>
            <p>{key}</p>
            {/* Add button next to each note */}
            <button className="bg-[crimson] text-[color:var(--text)] h-[100px] ml-2 cursor-auto p-2.5 rounded-[10px] border-[none]" onClick={() => handleDelete(key)}>Delete</button>
            <div>
            <HiOutlineDocumentDuplicate className="mx-8 mt-8 w-8 h-8" onClick={() => handleCopy2(key)} />
            </div>
          </div>
        ))}
        </div>
            </div>
            </div>}
            </div>
            
    )
}
export default Notes
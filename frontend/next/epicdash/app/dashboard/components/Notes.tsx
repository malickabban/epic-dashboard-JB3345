"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
import { useRouter } from 'next/navigation';
import { HiPlus, HiMinus, HiOutlineDocumentDuplicate  } from "react-icons/hi";
import Diagnosis from "../diagnosis/page";


export type notesInput = {
    notesActive: boolean,
    selectedPatient: Patient | null,
    setNotesActive: (value:boolean) => void
}


//Notes card for dashboard page
const Notes = (input: notesInput) => {
    const {notesActive, selectedPatient, setNotesActive} = input;
    const router = useRouter();
    const handleCopy = async () => {
        try {
            if (selectedPatient && typeof selectedPatient.diagnosisNote?.toString() === "string") {
                await navigator.clipboard.writeText(selectedPatient.diagnosisNote?.toString());
            }
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      }
    return (
        <div className="col-span card shadow-md my-4">
            <div className="flex justify-between">
            <div className="flex flex-col">
            <button className="bg-[var(--bg)] text-[var(--text)] p-1 ml-1 mt-1 rounded text-xl">Diagnostic Notes</button>
            
            <p className="ml-1 text-xs">(Click Diagnostic Notes for searchable notes)</p>
            <Diagnosis/>
        </div>
            
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
            
          </div>
    )
}
export default Notes
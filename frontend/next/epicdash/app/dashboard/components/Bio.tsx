"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../page"
export type bioInput = {
    bioActive: boolean,
    selectedPatient: Patient | null,
    setBioActive: (value:boolean) => void
}
//Bio card for the basic information section
const Bio = (input: bioInput) => {
    const {bioActive, selectedPatient, setBioActive} = input;
    return (
        <div>
        <div className="flex justify-between">
              <h6 className="ml-2 mt-2 flex-left"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">Bio</span></h6>
              {bioActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("bioCard");
                if (item && selectedPatient) item.style.display = "block";
                setBioActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("bioCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setBioActive(true);
                  }}
              />
                }
              </div>
              {!bioActive &&
            <div className="block h-[300px] align-middle overflow-auto" id="bioCard">
              <p className="ml-1 mt-10">Name: {selectedPatient ? selectedPatient.name : ""}</p>
              <p className="ml-1">Age: {selectedPatient && selectedPatient.age ? selectedPatient.age : ""}</p>
              <p className="ml-1">Gender: {selectedPatient && selectedPatient.gender ? selectedPatient.gender : ""}</p>
              <p className="ml-1">Deceased: {selectedPatient ? (selectedPatient.deceased ? "Yes" : "No") : ""}</p>
              <p className="ml-1">General Practitioner: {selectedPatient ? selectedPatient.generalPractitioner : ""}</p>
              <p className="ml-1">Patient ID: {selectedPatient ? selectedPatient.patientID : ""}</p>
              </div>
              }
        </div>
    )
}
export default Bio
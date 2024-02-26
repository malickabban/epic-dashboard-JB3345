"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../page"
export type observationInput = {
    observationsActive: boolean,
    selectedPatient: Patient | null,
    setObservationsActive: (value:boolean) => void
}

//Observations card for the basic information section
const Observations = (input: observationInput) => {
    const {observationsActive, selectedPatient, setObservationsActive} = input;
    return (
        <div>
        <div className="flex justify-between">
              <h6 className="ml-2 mt-2 flex-left"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">Observations</span></h6>
              {observationsActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("observationsCard");
                if (item && selectedPatient) item.style.display = "block";
                setObservationsActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("observationsCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setObservationsActive(true);
                  }}
              />
                }
              </div>
              <div className="block h-[300px] overflow-auto" id="observationsCard">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.observations ? 
                selectedPatient.observations.map((item) => item ? item + "\n\n" : "") : ""}</p>
              </div>
        </div>
    )
}
export default Observations
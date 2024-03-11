"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
export type conditionsInput = {
    conditionsActive: boolean,
    selectedPatient: Patient | null,
    setConditionsActive: (value:boolean) => void
}
//Conditions card for the basic information section
const Conditions = (input: conditionsInput) => {
    const {conditionsActive, selectedPatient, setConditionsActive} = input;
    return (
        <div>
        <div className="flex justify-between">
              <h6 className="ml-2 mt-2"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">Conditions</span></h6>
              {conditionsActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("conditionsCard");
                if (item && selectedPatient) item.style.display = "block";
                setConditionsActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("conditionsCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setConditionsActive(true);
                  }}
              />
                }
              </div>
              {!conditionsActive &&
              <div className="block h-[300px] overflow-auto" id="conditionsCard">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.conditions ? 
                    selectedPatient.conditions.map((item) => item ? item + "\n\n" : "") : ""}</p>
              </div>
              }
        </div>
    )
}
export default Conditions
"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
export type historyInput = {
    historyActive: boolean,
    selectedPatient: Patient | null,
    setHistoryActive: (value:boolean) => void
}

//History card for the basic information section
const History = (input: historyInput) => {
    const {historyActive, selectedPatient, setHistoryActive} = input;
    return (
        <div>
        <div className="flex justify-between">
              <h6 className="ml-2 mt-2"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">History</span></h6>
              {historyActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("historyCard");
                if (item && selectedPatient) item.style.display = "block";
                setHistoryActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("historyCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setHistoryActive(true);
                  }}
              />
                }
              </div>
              {!historyActive &&
                <div className="block h-[200px] overflow-auto" id="historyCard">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.encounters ?
                 selectedPatient.encounters.map((item) => item ? item + "\n" : "") : ""}</p>
                 </div>
              }
        </div>
    )
}
export default History
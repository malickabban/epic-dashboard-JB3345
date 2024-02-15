"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../page"
import Observations from "./Observations"
import Bio from "./Bio"
import Conditions from "./Conditions"
import History from "./History"
export type basicInput = {
    bioActive: boolean,
    selectedPatient: Patient | null,
    setBioActive: (value:boolean) => void
    historyActive: boolean,
    setHistoryActive: (value:boolean) => void
    observationsActive: boolean,
    setObservationsActive: (value:boolean) => void
    conditionsActive: boolean,
    setConditionsActive: (value:boolean) => void
}

//Basic Information card which combines all of the other cards into 1 big component
const BasicInfo = (input: basicInput) => {
    const {bioActive, selectedPatient, setBioActive, historyActive, setHistoryActive, observationsActive, setObservationsActive, conditionsActive, setConditionsActive} = input;
    return (
        <div className="col-span card shadow-md">
        <h4 className="mx-5 my-2 text-center bg-[var(--bg)] text-[var(--text)] p-2 rounded">Basic Information</h4>
          <div className="grid grid-cols-3 grid-rows-1 my-10 gap-4">
            <div className="card shadow-md hover:shadow-2xl ml-2 w-[33] col-span-1 row-span">
            <Bio bioActive={bioActive} setBioActive={setBioActive} selectedPatient={selectedPatient}/>
              </div>
              <div className="card shadow-md hover:shadow-2xl col-span-1 row-span w-[33]">
              <Observations observationsActive={observationsActive} selectedPatient={selectedPatient} setObservationsActive={setObservationsActive}/>
              </div>
              <div className="card shadow-md hover:shadow-2xl col-span-1 row-span mr-2 w-[33]" >
              <Conditions conditionsActive={conditionsActive} setConditionsActive={setConditionsActive} selectedPatient={selectedPatient}/>
              </div>
              </div>
              <div className="card shadow-md hover:shadow-2xl mx-2 mb-1" >
              <History selectedPatient={selectedPatient} historyActive={historyActive} setHistoryActive={setHistoryActive}/>
            </div>
         </div>
    )
}
export default BasicInfo
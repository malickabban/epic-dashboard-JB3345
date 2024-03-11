"use client";
import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
import Observations from "./Observations"
import Bio from "./Bio"
import Conditions from "./Conditions"
import History from "./History"
export type basicInput = {
    basicActive: boolean,
    setBasicActive: (value:boolean) => void,
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
    const {basicActive, setBasicActive, bioActive, selectedPatient, setBioActive, historyActive, setHistoryActive, observationsActive, setObservationsActive, conditionsActive, setConditionsActive} = input;

    //Handle making everything visible
    const handlePlus = () => {
      const item = document.getElementById("bioCard");
      const item2 = document.getElementById("conditionsCard");
      const item3 = document.getElementById("historyCard");
      const item4 = document.getElementById("observationsCard");
      if (item && selectedPatient) item.style.display = "block";
      if (item2 && selectedPatient) item2.style.display = "block";
      if (item3 && selectedPatient) item3.style.display = "block";
      if (item4 && selectedPatient) item4.style.display = "block";
      setBasicActive(false);
      setBioActive(false);
      setConditionsActive(false);
      setHistoryActive(false);
      setObservationsActive(false);
    };

    //Handle making everything invisible
    const handleMinus = () => {
      const item = document.getElementById("bioCard");
      const item2 = document.getElementById("conditionsCard");
      const item3 = document.getElementById("historyCard");
      const item4 = document.getElementById("observationsCard");
      if (item && selectedPatient) item.style.display = "none";
      if (item2 && selectedPatient) item2.style.display = "none";
      if (item3 && selectedPatient) item3.style.display = "none";
      if (item4 && selectedPatient) item4.style.display = "none";
      setBasicActive(true);
      setBioActive(true);
      setConditionsActive(true);
      setHistoryActive(true);
      setObservationsActive(true);
    };
    return (
        <div className="col-span card shadow-md">
        <div className="flex justify-between">
        <h4 className="flex-left ml-3 my-2 text-center bg-[var(--bg)] text-[var(--text)] p-2 rounded">Basic Information</h4>
        {basicActive ?
               <HiPlus className="mr-1 mt-2 float-right" 
               onClick= {handlePlus}/> :
              <HiMinus
                  className="mr-1 mt-2 float-right"
                  onClick= {handleMinus}
              />
                }
          </div>
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
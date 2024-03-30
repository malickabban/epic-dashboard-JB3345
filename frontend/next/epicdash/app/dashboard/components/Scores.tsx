"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
import { useRouter } from 'next/navigation';
import { HiPlus, HiMinus } from "react-icons/hi";
export type scoresInput = {
    selectedPatient: Patient | null,
    scoresActive: boolean,
    setScoresActive: (value:boolean) => void
}

//The scores component on the main dashboard page.

const Scores = (input: scoresInput) => {
    const {selectedPatient, scoresActive, setScoresActive} = input;
    const router = useRouter();
    return (
        <div className="card">
            <div className="flex justify-between">
            <button className="bg-[var(--bg)] text-[var(--text)] p-1 rounded text-xl" onClick={() => selectedPatient ? router.push('/dashboard/score') : null}>Scores</button>
            {scoresActive ?
               <HiPlus className="mr-1 mt-1 float-right" 
               onClick= {() => {
                const item = document.getElementById("scoresCard");
                if (item && selectedPatient) item.style.display = "block";
                setScoresActive(false);
              }}/> :
              <HiMinus
                  className="mr-1 mt-1 float-right"
                  onClick= {() => {
                    const item = document.getElementById("scoresCard");
                    if (item && selectedPatient) item.style.display = "none";
                    setScoresActive(true);
                  }}
              />
                }
            </div>
            <p className = "text-center text-xs mt-2">Click SCORES for more details</p>
            
            {!scoresActive &&
            <div id="scoresCard">
            <div className="card text-center m-2">
            <p>CHA2DS2-VASc</p>
            <p>{selectedPatient && selectedPatient.chadsvasc ? selectedPatient.chadsvasc : 0}</p>
            </div>
            <div className="card text-center m-2">
            <p>RCRI</p>
            <p>{selectedPatient && selectedPatient.rcri ? selectedPatient.rcri : 0}</p>
            </div>
            <div className="card text-center m-2">
            <p>HAS-BLED</p>
            <p>{selectedPatient && selectedPatient.hasBled ? selectedPatient.hasBled : 0}</p>
            </div>
            </div>
            }
          </div>
    )
}
export default Scores
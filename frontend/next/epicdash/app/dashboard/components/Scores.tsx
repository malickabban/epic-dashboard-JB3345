"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import type {Patient} from "../../Types"
import { useRouter } from 'next/navigation';
export type scoresInput = {
    selectedPatient: Patient | null
}

//The scores component on the main dashboard page.

const Scores = (input: scoresInput) => {
    const {selectedPatient} = input;
    const router = useRouter();
    return (
        <div className="card">
            <button className="bg-[var(--bg)] text-[var(--text)] p-1 rounded text-lg" onClick={() => selectedPatient ? router.push('/dashboard/score') : null}>Scores</button>
            <p className = "text-center text-xs mt-2">Click SCORES for more details</p>
            {selectedPatient &&
            <div>
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
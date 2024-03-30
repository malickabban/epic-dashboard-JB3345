"use client"
import { createContext, useState } from "react"
import type {PatientMap, Patient} from "./Types"
import type {scoreMap} from "./Types"
export type patientContextType = {
    displayedPatients: PatientMap | null,
    setDisplayedPatients: (value: PatientMap | null) => void,
    setSelectedPatient: (value: Patient | null) => void,
    selectedPatient: Patient | null,
    conditionsActive : boolean, 
    setConditionsActive : (value: boolean) => void,
    historyActive : boolean, 
    setHistoryActive : (value: boolean) => void,
    observationsActive : boolean, 
    setObservationsActive : (value: boolean) => void,
    bioActive : boolean, 
    setBioActive : (value: boolean) => void,
    basicActive : boolean, 
    setBasicActive : (value: boolean) => void,
    scores : scoreMap,
    setScores : (value: scoreMap) => void,
    resetPatient : () => void,
    notesActive : boolean, 
    setNotesActive : (value: boolean) => void,
    scoresActive : boolean, 
    setScoresActive : (value: boolean) => void,
}

export const PatientContext = createContext<patientContextType | null>(null);

//This file ensures that all of the information can be saved between the two pages of the diagram

const PatientSource: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [displayedPatients, setDisplayedPatients] = useState<PatientMap | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [conditionsActive, setConditionsActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);
    const [bioActive, setBioActive] = useState(false);
    const [observationsActive, setObservationsActive] = useState(false);
    const [basicActive, setBasicActive] = useState(false);
    const [notesActive, setNotesActive] = useState(false);
    const [scoresActive, setScoresActive] = useState(false);

    //resets the basic info view for changing the selected patient or deleting a patient
    const resetPatient = () => {
      const observationsCard = document.getElementById("observationsCard");
        const historyCard = document.getElementById("historyCard");
        const conditionsCard = document.getElementById("conditionsCard");
        const bioCard = document.getElementById("bioCard");
        const notesCard = document.getElementById("notesCard");
        const scoresCard = document.getElementById("scoresCard");
        if (observationsCard && observationsCard.style.display === "none") {
          observationsCard.style.display = "block";
        }
        if (historyCard && historyCard.style.display === "none") {
          historyCard.style.display = "block";
        }
        if (conditionsCard && conditionsCard.style.display === "none") {
          conditionsCard.style.display = "block";
        }
        if (bioCard && bioCard.style.display === "none") {
          bioCard.style.display = "block";
        }
        if (notesCard && notesCard.style.display === "none") {
          notesCard.style.display = "block";
        }
        if (scoresCard && scoresCard.style.display === "none") {
          scoresCard.style.display = "block";
        }
        setBasicActive(false);
        setConditionsActive(false);
        setHistoryActive(false);
        setObservationsActive(false);
        setBioActive(false);
        setNotesActive(false);
        setScoresActive(false);
        setScores({});
    };
    const [scores, setScores] = useState({});
    return (
        <PatientContext.Provider value={{ displayedPatients, selectedPatient, setDisplayedPatients,setSelectedPatient,
          conditionsActive, setConditionsActive, historyActive, setHistoryActive, observationsActive, setObservationsActive, 
          basicActive, setBasicActive, bioActive, setBioActive, scores, setScores, resetPatient, notesActive, setNotesActive, 
          scoresActive,setScoresActive}}>
          {children}
        </PatientContext.Provider>
      );
}
export default PatientSource

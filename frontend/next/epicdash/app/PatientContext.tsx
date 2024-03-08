"use client"
import { createContext, useState } from "react"
import type {PatientMap, Patient} from "./dashboard/page"
import type {scoreMap} from "./dashboard/score/page"
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
    resetPatient : () => void
}

export const PatientContext = createContext<patientContextType | null>(null);

const PatientSource: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [displayedPatients, setDisplayedPatients] = useState<PatientMap | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [conditionsActive, setConditionsActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);
    const [bioActive, setBioActive] = useState(false);
    const [observationsActive, setObservationsActive] = useState(false);
    const [basicActive, setBasicActive] = useState(false);
    const resetPatient = () => {
      const observationsCard = document.getElementById("observationsCard");
        const historyCard = document.getElementById("historyCard");
        const conditionsCard = document.getElementById("conditionsCard");
        const bioCard = document.getElementById("bioCard");
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
        setBasicActive(false);
        setConditionsActive(false);
        setHistoryActive(false);
        setObservationsActive(false);
        setBioActive(false);
        setScores({});
    };
    const [scores, setScores] = useState({});
    return (
        <PatientContext.Provider value={{ displayedPatients, selectedPatient, setDisplayedPatients,setSelectedPatient,
          conditionsActive, setConditionsActive, historyActive, setHistoryActive, observationsActive, setObservationsActive, 
          basicActive, setBasicActive, bioActive, setBioActive, scores, setScores, resetPatient}}>
          {children}
        </PatientContext.Provider>
      );
}
export default PatientSource
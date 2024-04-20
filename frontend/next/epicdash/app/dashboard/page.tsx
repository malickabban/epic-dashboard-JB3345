"use client";
import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import Search from "./components/Search";
import BasicInfo from "./components/BasicInfo"
import {PatientContext, patientContextType} from '../PatientContext'
import {Patient, PatientMap, clonePatient} from "../Types";
import Scores from "./components/Scores"
import Notes from "./components/Notes"

const Dashboard: React.FC = () => {
  const { displayedPatients, selectedPatient, setDisplayedPatients,setSelectedPatient,
    conditionsActive, setConditionsActive, historyActive, setHistoryActive, observationsActive, setObservationsActive, 
    basicActive, setBasicActive, bioActive, setBioActive, resetPatient, notesActive, setNotesActive, scoresActive, setScoresActive} = useContext(PatientContext) as patientContextType
  const [data, setData] = useState<PatientMap | null>({});
  const [names, setNames] =  useState<PatientMap | null>(null); //For names of patients

  //handles when the selected patient changes
  const handleButtonClick = (key: string) => {
    if (displayedPatients) {
      resetPatient();
      setSelectedPatient(displayedPatients[key]);
      const next = document.getElementById(key);
      const prev = document.getElementsByClassName("list-group-item border-left-0 cursor-pointer hover:bg-black hover:bg-opacity-10 active");
      if (prev && prev[0]) {
        prev[0].className = "list-group-item border-left-0 cursor-pointer hover:bg-black hover:bg-opacity-10";
      }
      if (next) {
        next.className = next.className + " active";
      }
    }
  };

  //removes patient from displayed patients list and resets selected patient
  const handleRemovePatient = (key: string) => {
    if (displayedPatients && data) {
      const thing:PatientMap = {}
      Object.keys(displayedPatients).map((key2) => thing[key2] = displayedPatients[key2]);
      delete thing[key];
      resetPatient();
      setDisplayedPatients(thing);
      setSelectedPatient(null);
    }
  };
  
  //adds patient to displayed patient list
  const handleAddPatient = (key: string) => {
    if (displayedPatients && data && data[key] != undefined && displayedPatients[key] == undefined) {
      const thing:PatientMap = {}
      Object.keys(displayedPatients).map((key) => thing[key] = displayedPatients[key]);
      thing[key] = clonePatient(data[key])
      setDisplayedPatients(thing);
    } else {
        const thing:PatientMap = {}
        if (data && data[key] != undefined) {
          thing[key] = clonePatient(data[key])
          setDisplayedPatients(thing)
        }
    }
  }

  //gets all of the patients from the backend and loads them into data state and names state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/getPatients", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result) {
          console.log(result)
          const thing:PatientMap |null = {};
          const arr:Array<string> = []
          //Manually doing this because Java object from backend was not automatically converting.
          Object.keys(result).forEach((key) => {
            const t:Patient = clonePatient(result[key]);
            arr.push(result[key].name);
            if (thing) {
              thing[result[key].patientID] = t;
            }
            t.encounters?.sort();
          });
          setData(thing);
          setNames(thing);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    //Sets active patient when returning from Scores page.
    if (selectedPatient) {
      const next = document.getElementById(selectedPatient.patientID);
      const prev = document.getElementsByClassName("list-group-item border-left-0 cursor-pointer hover:bg-black hover:bg-opacity-10 active");
      if (prev && prev[0]) {
        prev[0].className = "list-group-item border-left-0 cursor-pointer hover:bg-black hover:bg-opacity-10";
      }
      if (next) {
        next.className = next.className + " active";
      }
    }
  }, []);

  const [searchValue, setSearchValue] = useState('')
  const handleSearch = (value: string) => {
    // search value when Enter is pressed
    setSearchValue(value)
  }
  useEffect(() => {
    //Change search dropdown while searching
    if (searchValue === "") {
      setNames(data);
    } else {
      const thing:PatientMap = {};
      if (data) {
        Object.keys(data).forEach((key) => {
          if (data[key].name.toLowerCase().includes(searchValue.toLowerCase())) {
            thing[key] = data[key];
          }
        });
      }
      setNames(thing || null);
    }
  },[searchValue]);

  // Your raw data, keys, and selected patient can now be used in the return statement
  return (
    <div className=" grid grid-cols-9 grid-rows-7 gap-4 w-[100%] min-h-screen">
        <div className="row-span-6 col-span-2 card shadow-md">
          <div>
          <h4 className="mb-3 mt-3 ml-2"><span className="bg-[var(--bg)] text-[var(--text)] p-2 rounded">Patients</span></h4>
            <div className="mb-4 ml-1" >
              <Search onSearch={handleSearch} names={names} onAdd={handleAddPatient}/>
            </div>
            <div className="list-group">
              {displayedPatients && (
                <ul className="pl-0">
                  {Object.keys(displayedPatients).map((key) => (
                    <li className="list-group-item border-left-0 cursor-pointer hover:bg-black hover:bg-opacity-10" id={key} key = {key}>
                      <button onClick={() => handleButtonClick(key)}>
                        {displayedPatients[key].name}
                      </button>
                      <button
                        type="button"
                        className="btn-close float-right"
                        aria-label="Close"
                        onClick={() => handleRemovePatient(key)}
                      ></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-6 row-span-9 flex flex-col">
          <BasicInfo basicActive={basicActive} setBasicActive={setBasicActive} bioActive={bioActive} selectedPatient={selectedPatient} setBioActive={setBioActive} historyActive={historyActive} setHistoryActive={setHistoryActive} 
          observationsActive={observationsActive} setObservationsActive={setObservationsActive} conditionsActive={conditionsActive} setConditionsActive={setConditionsActive}/>
          <Notes notesActive={notesActive} setNotesActive={setNotesActive} selectedPatient={selectedPatient}/>
        </div>
        <div className="row-span-5 col-span-1">
          <Scores selectedPatient={selectedPatient} scoresActive={scoresActive} setScoresActive={setScoresActive}/>
        </div>
    </div>
  );
};



export default Dashboard;

{
  /* 
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleRemovePatient}
      >
        Remove Bottom Patient
      </button> 
      <button
        type="button"
        className="btn btn-success"
        onClick={handleAddPatient}
      >
        Add Patient
      </button>
      */
}

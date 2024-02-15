"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import Search from "./components/Search";
import { HiOutlineX } from "react-icons/hi";

export type Patient = {
  // Define the structure of your JSON data here
  // For example:
  deceased: boolean;
  name: string;
  patientID: string;
  generalPractitioner: string | null;
  conditions : string[] | null;
  observations : string[] | null;
  encounters : string[] | null;

  // Add more properties as needed
};
export type PatientMap = Record<string, Patient>;

const Dashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [data, setData] = useState<PatientMap | null>({});
  const [displayedPatients, setDisplayedPatients] =
    useState<PatientMap | null>(null);
  const [names, setNames] =  useState<PatientMap | null>(null); //For names of patients

  const handleButtonClick = (key: string) => {
    if (displayedPatients) {
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

  const handleRemovePatient = (key: string) => {
    if (displayedPatients && data) {
      const thing:PatientMap = {}
      Object.keys(displayedPatients).map((key2) => thing[key2] = displayedPatients[key2]);
      delete thing[key];
      setDisplayedPatients(thing);
      setSelectedPatient(null);
    }
  };
  const handleAddPatient = (key: string) => {
    if (displayedPatients && data && data[key] != undefined && displayedPatients[key] == undefined) {
      const thing:PatientMap = {}
      Object.keys(displayedPatients).map((key) => thing[key] = displayedPatients[key]);
      thing[key] = {
          name: data[key].name,
          deceased: data[key].deceased,
          generalPractitioner: data[key].generalPractitioner,
          patientID: data[key].patientID,
          conditions: data[key].conditions,
          observations: data[key].observations,
          encounters: data[key].encounters,
      }
      setDisplayedPatients(thing);
    }
  }
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
          setDisplayedPatients({});
          const thing:PatientMap |null = {};
          const arr:Array<string> = []
          //Manually doing this because Java object from backend was not automatically converting.
          Object.keys(result).forEach((key) => {
            const t:Patient = {
              deceased: result[key].deceased,
              name: result[key].name,
              generalPractitioner: result[key].generalPractitioner,
              patientID: result[key].patientID,
              conditions: result[key].conditions,
              observations: result[key].observations,
              encounters: result[key].encounters,
            };
            arr.push(result[key].name);
            if (data) {
              data[result[key].patientID] = t;
            }
          });
          setData(data);
          setNames(data);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
  // Handle the removal of the bottom-most patient

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
        <div className="col-span-6 row-span-5">
        <div className="col-span card shadow-md hover:shadow-2xl min-h-[600px]">
        <h4 className="mx-5 my-2 text-center bg-[var(--bg)] text-[var(--text)] p-2 rounded">Basic Information</h4>
          <div className="grid grid-cols-3 grid-rows-1 my-10 gap-4">
            <div className="card shadow-md hover:shadow-2xl ml-2  max-w-[33] col-span-1 row-span">
            <div className="block h-[300px] align-middle overflow-auto">
              <p className="ml-1 mt-20">Name: {selectedPatient ? selectedPatient.name : ""}</p>
              <p className="ml-1">Deceased: {selectedPatient ? (selectedPatient.deceased ? "Yes" : "No") : ""}</p>
              <p className="ml-1">General Practitioner: {selectedPatient ? selectedPatient.generalPractitioner : ""}</p>
              <p className="ml-1">Patient ID: {selectedPatient ? selectedPatient.patientID : ""}</p>
              </div>
              </div>
              <div className="card shadow-md hover:shadow-2xl col-span-1 row-span max-w-[33]">
              <h6 className="ml-2 mt-2"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">Observations</span></h6>
              <div className="block h-[300px] overflow-auto">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.observations ? selectedPatient.observations.map((item) => item ? item + "\n\n" : "") : ""}</p>
              </div>
              </div>
              <div className="card shadow-md hover:shadow-2xl col-span-1 row-span mr-2 max-w-[33]">
              <h6 className="ml-2 mt-2"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">Conditions</span></h6>
              <div className="block h-[300px] overflow-auto">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.conditions ? 
                    selectedPatient.conditions.map((item) => item ? item + "\n\n" : "") : ""}</p>
              </div>
              </div>
              </div>
              <div className="card shadow-md hover:shadow-2xl">
              <h6 className="ml-2 mt-2"><span className="bg-[var(--bg)] text-[var(--text)] p-1 rounded">History</span></h6>
                <div className="block h-[200px] overflow-auto">
                <p className="ml-2 whitespace-pre-line">{selectedPatient && selectedPatient.encounters ?
                 selectedPatient.encounters.map((item) => item ? item + "\n" : "") : ""}</p>
                 </div>
            </div>
         </div>

      <div className="row-span-3 col-span-3">
        <div className="col-md-3 .offset-md-3">
        </div>

      </div>
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

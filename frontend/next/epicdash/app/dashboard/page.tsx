"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";
import Search from "./components/Search";

type Patient = {
  // Define the structure of your JSON data here
  // For example:
  deceased: boolean;
  generalPracticioner: string | null;
  name: string;
  patientID: number;
  // Add more properties as needed
};
type PatientMap = Record<number, Patient>;

const Dashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [data, setData] = useState<PatientMap | null>(null);
  const [jsonKeys, setJsonKeys] = useState<Array<string> | null>(null);
  const [displayedPatients, setDisplayedPatients] =
    useState<Array<string> | null>(null);
  const [names, setNames] =  useState<Array<string> | null>(null);
  const [originalPatients, setOriginalPatients] =  useState<Array<string> | null>(null);
  const handleButtonClick = (key: string) => {
    if (data) {
      
    }
  };

  const handleRemovePatient = (key: string) => {
    if (displayedPatients && data) {
      const temp = displayedPatients.filter((item) => item !== key);
      setDisplayedPatients(temp);
      setSelectedPatient(null);
    }
  };
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
          const thing:PatientMap = {};
          setJsonKeys(Object.keys(result));
          setDisplayedPatients(Object.keys(result).splice(0,jsonKeys?.length));
          const arr = []
          for (let index = 0; index < result.length; index++) {
            arr.push(result[index].name);
            const t:Patient = {
              deceased: result[index].deceased,
              generalPracticioner: result[index].generalPracticioner,
              name: result[index].name,
              patientID: result[index].patinetID
            };
            thing[index] = t;
          }
          setData(thing); 
          setNames(arr);
          setOriginalPatients(arr);
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
    if (searchValue === "") {
      setNames(originalPatients);
    } else {
      const thing = originalPatients?.filter(((el) => el.toLowerCase().includes(searchValue.toLowerCase())));
      setNames(thing || null);
    }
  },[searchValue]);
  const handleAddPatient = (key: string) => {
    if (displayedPatients && originalPatients && originalPatients.includes(key) && !displayedPatients.includes(key)) {
      const temp = [...displayedPatients];
      temp.length = temp.length + 1;
      temp[temp.length - 1] = key;
      setDisplayedPatients(temp);
    }
  }
  // Handle the removal of the bottom-most patient

  // Your raw data, keys, and selected patient can now be used in the return statement
  return (
    
    <div className="container">
              <h2 id="center">Epic Dashboard </h2>
      <div className="row">
        <div className="col-sm-4">
          <div className="list-group">
            <div>
              <Search onSearch={handleSearch} names={names} onAdd={handleAddPatient} />
            </div>
            <div>
              {displayedPatients && (
                <ul>
                  {displayedPatients.map((key) => (
                    <li className="list-group-item border-left-0" key={key}>
                      <button onClick={() => handleButtonClick(key)}>
                        {key}
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
        <div className="col-md-3 py-5">
          {selectedPatient && (
            <div>
              <p>Name: {selectedPatient.name}</p>
              <p>Address: {}</p>
              
            </div>
          )}
        </div>

      </div>
      <div className="row">
        <div className="col-md-3 .offset-md-3">
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

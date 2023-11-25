"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle";

type Patient = {
  // Define the structure of your JSON data here
  // For example:
  name: string;
  address: string;
  // Add more properties as needed
};
type PatientMap = Record<string, Patient>;

const Dashboard: React.FC = () => {
  const patients = ["Patient A", "Patient B", "Patient C"];
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [data, setData] = useState<PatientMap | null>(null);
  const [jsonKeys, setJsonKeys] = useState<Array<string> | null>(null);
  const [displayedPatients, setDisplayedPatients] =
    useState<Array<string> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/getPatients", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
        if (result) {
          setJsonKeys(Object.keys(result));
          setDisplayedPatients(Object.keys(result).splice(0,jsonKeys?.length));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (key: string) => {
    if (data) {
      setSelectedPatient(data[key]);
    }
  };

  const handleRemovePatient = (key: string) => {
    if (displayedPatients && data) {
      const temp = displayedPatients.filter((item) => item !== key);
      setDisplayedPatients(temp);
      setSelectedPatient(null);
    }
  };

  const handleAddPatient = (key: string) => {
    if (
      displayedPatients &&
      jsonKeys &&
      displayedPatients.length < jsonKeys.length &&
      displayedPatients.indexOf(key) == -1
    ) {
      const temp = [...displayedPatients];
      temp.length = temp.length + 1;
      temp[temp.length - 1] = key;
      setDisplayedPatients(temp);
      setSelectedPatient(null);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle the removal of the bottom-most patient

  // Your raw data, keys, and selected patient can now be used in the return statement
  return (
    <div className="container">
      <div className="row">
        <h1>Epic Dashboard</h1>
        <div className="col-md-4">
          <div className="list-group">
            <div>
              {displayedPatients && (
                <ul>
                  {displayedPatients.map((key) => (
                    <li className="list-group-item" key={key}>
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
        <div className="col-md-3">
          {selectedPatient && (
            <div>
              <p>Name: {selectedPatient.name}</p>
              <p>Address: {selectedPatient.address}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Add Patient
          </button>
          <ul className="dropdown-menu">
          {jsonKeys && (
                <ul>
                  {jsonKeys.map((key) => (
                    <li className="dropdown-item" key={key}>
                      <button onClick={() => handleAddPatient(key)}>
                        {key}
                      </button>
                      
                    </li>
                  ))}
                </ul>
              )}
          </ul>
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

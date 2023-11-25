"use client"
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

type Patient = {
  // Define the structure of your JSON data here
  // For example:
  name: string;
  address: string;
  // Add more properties as needed
};
type PatientMap = Record<string, Patient>;

const Dashboard: React.FC = () => {
  const patients = ['Patient A', 'Patient B', 'Patient C'];
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const [data, setData] = useState<PatientMap | null>(null);
  const [jsonKeys, setJsonKeys] = useState<Array<string> | null>(null);
  const [displayedPatients, setDisplayedPatients] = useState<Array<string> | null>(null);





  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/getPatients', {
        headers : {
          "Content-Type" : "application/json",
        }
      });
      const result = await response.json();
      setData(result);
      if (result) {
        setJsonKeys(Object.keys(result));
        setDisplayedPatients(Object.keys(result))
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

}, []);

const handleButtonClick = (key: string) => {
  if(data){
  setSelectedPatient(data[key]);
}
};

const handleRemovePatient = () => {
  if(displayedPatients && data){
  const temp = displayedPatients;
  temp.length = temp.length-1;
  setDisplayedPatients(temp);
  setSelectedPatient(null);
}

};

const handleAddPatient = () => {
  if(displayedPatients && jsonKeys && displayedPatients.length < jsonKeys.length){
    const temp = displayedPatients;
    temp.length = temp.length+1;
    temp[temp.length-1] = jsonKeys[temp.length-1];
    setDisplayedPatients(temp);
    setSelectedPatient(null);
}
};



 // Handle the removal of the bottom-most patient
 

// Your raw data, keys, and selected patient can now be used in the return statement
return (
  <div className="container-fluid">
    <h1>Epic Dashboard</h1>
    <div className="list-group">
      <div>
        {displayedPatients && (
          <ul>
            {displayedPatients.map((key) => (
              <li key={key}>
                <button onClick={() => handleButtonClick(key)}>{key}</button>
              </li>
            ))}
          </ul>
        )}

        </div>
        <div className="information-box">
        {selectedPatient && (
          <div>
            <h2>Selected Patient</h2>
            <p>Name: {selectedPatient.name}</p>
            <p>Address: {selectedPatient.address}</p>
          </div>
        )}
      </div>
    </div>
    <button type="button" className="btn btn-danger" onClick ={handleRemovePatient}>Remove Bottom Patient</button>
        <button type="button" className="btn btn-success" onClick={ handleAddPatient}>Add Patient</button>
    </div>
  );
};

export default Dashboard;
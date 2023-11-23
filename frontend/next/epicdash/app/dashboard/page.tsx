"use client"
import { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const patients = ['Patient A', 'Patient B', 'Patient C'];
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getData', {
          headers : {
            "Content-Type" : "application/json",
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    // const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // return Array.from({ length: 5 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  

  return (
    <div className="dashboard-container">
      <div className="type-list">
        <h3>Patients</h3>
        <ul>
          {patients.map((patient) => (
            <li key={patient} onClick={() => setSelectedPatient(patient)}>
              {patient}
            </li>
          ))}
        </ul>
      </div>

      <div className="information-box">
        <h3>Information Box</h3>
        {selectedPatient ? (
          <div>
            <p>Patient: {selectedPatient}</p>
            {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>)}
          </div>
        ) : (
          <p>Select a patient from the list</p>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .type-list {
          flex: 1;
          padding-right: 20px;
        }

        .type-list h3 {
          color: #333;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          cursor: pointer;
          margin-bottom: 10px;
          padding: 8px;
          background-color: #f0f0f0;
          border-radius: 4px;
        }

        li:hover {
          background-color: #e0e0e0;
        }

        .information-box {
          flex: 2;
          padding-left: 20px;
          border-left: 1px solid #ccc;
        }

        .information-box h3 {
          color: #333;
        }

        .information-box p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
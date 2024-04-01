package com.backend;

import java.io.IOException;
import java.util.HashMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Component
public class GetPatientsHourly {

    private volatile String patients = null; // This is your global variable
    

    // This method will run hourly
    @PostConstruct
    @Scheduled(cron = "0 0 * * * *") // Cron expression for every hour
    public void updateGlobalVariable() {
        // Perform the logic to update the global variable

            System.out.println("we are running hourly patient fetch");
    

         try {
            //ObjectMapper turns patients into a string that resembles json
            ObjectMapper objectMapper = new ObjectMapper();
            //GetPatientsService controller = new GetPatientsService();
            //HashMap<String, com.backend.Patient> recieved_patients = controller.getData();


            HashMap<String, com.backend.Patient> recieved_patients = new HashMap<>();
            Patient testPatient = new Patient("John Doe");
            testPatient.setPatientId("1");
            testPatient.setAge(76);
            testPatient.setGender("Male");
            testPatient.setChadsVasc(4);
            testPatient.setStroke(true);
            testPatient.setRenalDisease(true);
            testPatient.setCHF(true);
            testPatient.setHasBled(3);
            testPatient.setRCRIScore(1);
            String[] conditions = new String[3];
            conditions[0] = "Embolism";
            conditions[1] = "Renal Disease";
            conditions[2] = "Congestive Heart Failure";
            testPatient.setConditions(conditions);
            testPatient.addChadsvascNote("""
                High Risk: Patient presents a high risk of stroke. Multiple significant risk factors are present, 
                necessitating strong consideration of anticoagulation therapy to reduce the risk of stroke. 
                Close monitoring and management are essential to mitigate the risk of thromboembolic events.
                """);
            
            recieved_patients.put("1", testPatient);

            patients = objectMapper.writeValueAsString(recieved_patients);

        } catch (IOException e) {
            e.printStackTrace();
            patients = "error";
        }

    }

    // Method to access the global variable
    public synchronized String getGlobalVariable() {
        return patients;
    }
}

    

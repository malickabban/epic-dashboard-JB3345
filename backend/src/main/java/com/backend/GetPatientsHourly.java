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
            GetPatientsService controller = new GetPatientsService();
            HashMap<String, com.backend.Patient> recieved_patients = controller.getData();
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

    

package com.backend;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private GetPatientsController getPatientsController;

    @GetMapping("/patients")
    @ResponseBody
    public ResponseEntity<List<Protopatient.Patient>> getPatients() {
        try {
            // Get Proto messages from backend
            List<Protopatient.Patient> protoPatients = getPatientsController.getData();

            // Send Proto messages to the front end
            return new ResponseEntity<>(protoPatients, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
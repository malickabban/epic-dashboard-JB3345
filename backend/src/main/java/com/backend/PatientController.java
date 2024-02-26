package com.backend;

import org.springframework.beans.factory.annotation.Autowired;
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
    private GetPatientsHourly getPatientsHourly;

    @GetMapping("/getPatients")
    @ResponseBody
    public String getPatients() {

        return getPatientsHourly.getGlobalVariable();
       
    }
}
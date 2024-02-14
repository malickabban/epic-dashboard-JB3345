package com.backend;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private GetPatientsHourly getPatientsHourly;

    // This main method exists for debugging purposes
    // public static void main(String[] args){
    //     try {
    //         PatientController pat = new PatientController();
    //         System.out.println(pat.getPatients());
    //     } catch (Exception e) {
    //         // TODO: handle exception
    //         System.out.println("Exception in PatientController main " + e);
    //     }
    // }
    @Autowired
    private GetPatientsController getPatientsController;

    @GetMapping("/getPatients")
    @ResponseBody
    public String getPatients() {

        return getPatientsHourly.getGlobalVariable();
       
    }
}
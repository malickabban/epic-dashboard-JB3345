package com.JD3345.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JsonReader {
    @GetMapping("/getPatients")
    public Map<String, Object> getData() throws IOException {
        System.out.println("YEAH I JUST GOT CALLED");
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,Object> map = new HashMap<>();


        Resource resource = new ClassPathResource("patientA.json");
        Map<String, Object> data = objectMapper.readValue(resource.getInputStream(), Map.class);
        ArrayList<LinkedHashMap> address = (ArrayList) data.get("address");
        ArrayList<LinkedHashMap> name = (ArrayList) data.get("name");
        Patient patientA = new Patient(formatName(name), address.get(0).get("text").toString());
        map.put(patientA.getName(), patientA);

        resource = new ClassPathResource("patientB.json");
        data = objectMapper.readValue(resource.getInputStream(), Map.class);
        address = (ArrayList) data.get("address");
        name = (ArrayList) data.get("name");
        Patient patientB = new Patient(formatName(name), address.get(0).get("text").toString());
        map.put(patientB.getName(), patientB);

        resource = new ClassPathResource("patientC.json");
        data = objectMapper.readValue(resource.getInputStream(), Map.class);
        address = (ArrayList) data.get("address");
        name = (ArrayList) data.get("name");
        Patient patientC = new Patient(formatName(name), address.get(0).get("text").toString());
        map.put(patientC.getName(), patientC);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

        System.out.println(address.get(0).get("text"));
        System.out.println(formatName(name));

        System.out.println(map);
        
        return map;
    }

    private String formatName(ArrayList<LinkedHashMap> data) {

        return (data.get(0).get("given").toString()).replaceAll("\\[","").replaceAll("\\]", "").replaceAll(",", "") +" "+  data.get(0).get("family");
    }


}
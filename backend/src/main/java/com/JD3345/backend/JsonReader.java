package com.JD3345.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class JsonReader {

    @GetMapping("/getData")
    public Map<String, Object> getData() throws IOException {
        System.out.println("YEAH I JUST GOT CALLED");
        Resource resource = new ClassPathResource("patient.json");
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> data = objectMapper.readValue(resource.getInputStream(), Map.class);
        return data;
    }
}
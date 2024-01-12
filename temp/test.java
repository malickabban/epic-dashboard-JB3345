package com.jd3345.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.io.IOException;

public class test {


    public static void main(String[] args) throws IOException{ 
        System.out.println("YEAH I JUST GOT CALLED");
        Resource resource = new ClassPathResource("patientA.json");
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> data = objectMapper.readValue(resource.getInputStream(), Map.class);
        ArrayList<LinkedHashMap> address = (ArrayList) data.get("address");
        ArrayList<LinkedHashMap> name = (ArrayList) data.get("name");

        System.out.println(address.get(0).get("text"));
        test thing = new test();
        System.out.println(thing.formatName(name));

        //System.out.println(data.get("address"));

    }

    private String formatName(ArrayList<LinkedHashMap> data) {

        return (data.get(0).get("given").toString()).replaceAll("\\[","").replaceAll("\\]", "").replaceAll(",", "") +" "+  data.get(0).get("family");
    }
    
    
}

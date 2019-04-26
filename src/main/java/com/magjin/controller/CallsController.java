package com.magjin.controller;

import com.magjin.sevices.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api")
public class CallsController {


    @Autowired
    private DbService service;

    @RequestMapping("/calls/tstDbSetup")
    public String greeting2() {
        service.tableInit();
        return "Test message " + "tstDbSetup" + ". Server time is " + Instant.now().toString();
    }

    @RequestMapping("/tstIndx")
    public String greeting3() {
        service.checkIndex();
        return "Test message . Server time is " + Instant.now().toString();
    }

    @RequestMapping("/tstInserts")
    public String greeting4() {
        service.insertEntities();
        service.insertTags();
        service.insertPrograms();
        service.printAll();
        return "Test message . Server time is " + Instant.now().toString();
    }
}

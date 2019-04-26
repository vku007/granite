package com.magjin.controller;


import com.magjin.sevices.DbService;
import com.magjin.sevices.TestsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {

    Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private TestsService testsService;

    @RequestMapping("/tests")
    public List<TestDto> getTests(@RequestParam(value="name", defaultValue="default") String name) {
        logger.debug("getTests {} time {}", name, Instant.now().toString());

        return testsService.getAllTests();
    }

    @RequestMapping("/tests/{id}")
    public TestDto getTestById(@PathVariable("id")  String id) {
        logger.debug("getTestById {} time {}", id, Instant.now().toString());
        return testsService.getTestById(id);
    }

    @RequestMapping("/tst")
    public String greeting(@RequestParam(value="name", defaultValue="default") String name) {
        return "Test message " + name + ". Server time is " + Instant.now().toString();
    }

}

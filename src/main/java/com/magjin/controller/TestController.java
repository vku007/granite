package com.magjin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
public class TestController {

    @RequestMapping("/tst")
    public String greeting(@RequestParam(value="name", defaultValue="default") String name) {
        return "Test message " + name + ". Server time is " + Instant.now().toString();
    }
}

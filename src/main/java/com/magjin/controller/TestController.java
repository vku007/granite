package com.magjin.controller;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Index;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.TableCollection;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ListTablesResult;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.magjin.ProductInfo;
import com.magjin.ProductInfoRepository;
import com.magjin.sevices.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
public class TestController {


    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    private AmazonDynamoDB amazonDynamoDB;

    @Autowired
    private ProductInfoRepository repository;


    @Autowired
    private DbService service;

    @RequestMapping("/tst")
    public String greeting(@RequestParam(value="name", defaultValue="default") String name) {
        return "Test message " + name + ". Server time is " + Instant.now().toString();
    }

    @RequestMapping("/tstDbSetup")
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

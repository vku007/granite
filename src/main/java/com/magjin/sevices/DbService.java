package com.magjin.sevices;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Index;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.DeleteTableRequest;
import com.amazonaws.services.dynamodbv2.model.ListTablesResult;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;
import com.magjin.ProductInfo;
import com.magjin.persistance.BareEntity;
import com.magjin.persistance.Program;
import com.magjin.persistance.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

@Component
public class DbService {

    @Autowired
    private AmazonDynamoDB amazonDynamoDB;

    public void tableInit() {


        DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(amazonDynamoDB);

        ListTablesResult tables = amazonDynamoDB.listTables();

        List<String> strLst = tables.getTableNames();

        if (strLst != null && !strLst.isEmpty()) {
            System.out.println(strLst);
            if (strLst.contains("ProductInfo")) {
                DeleteTableRequest deleteTableReq = new DeleteTableRequest().withTableName("ProductInfo");
                amazonDynamoDB.deleteTable(deleteTableReq);
                System.out.println("Deleted table " + "ProductInfo");
            }

            if (strLst.contains("Entity")) {
                DeleteTableRequest deleteTableReq = new DeleteTableRequest().withTableName("Entity");
                amazonDynamoDB.deleteTable(deleteTableReq);
                System.out.println("Deleted table " + "Entity");
            }



        }


        CreateTableRequest tableRequest = dynamoDBMapper
                .generateCreateTableRequest(ProductInfo.class);

        CreateTableRequest tableRequest2 = dynamoDBMapper
                .generateCreateTableRequest(BareEntity.class);

        tableRequest.setProvisionedThroughput(
                new ProvisionedThroughput(1L, 1L));
        amazonDynamoDB.createTable(tableRequest);


        tableRequest2.setProvisionedThroughput(
                new ProvisionedThroughput(1L, 1L));

        tableRequest2.getGlobalSecondaryIndexes().get(0).setProvisionedThroughput(new ProvisionedThroughput(1l, 1l));
        amazonDynamoDB.createTable(tableRequest2);

    }

    public void checkIndex() {
        ListTablesResult tables = amazonDynamoDB.listTables();

        List<String> strLst = tables.getTableNames();

        if (strLst != null && !strLst.isEmpty()) {
            System.out.println(strLst);
            if (strLst.contains("Entity")) {
                DynamoDB dynamoDB = new DynamoDB(amazonDynamoDB);
                Table table = dynamoDB.getTable("Entity");
                Index populationIndex = table.getIndex("myGsi5");
                System.out.println(populationIndex);
            }
        }

    }

    public void printAll() {
        System.out.println("RAW DATA");
        ScanRequest scanRequest = new ScanRequest()
                .withTableName("Entity");
        ScanResult scan = amazonDynamoDB.scan(scanRequest);
        for (Map<String, AttributeValue> item : scan.getItems()){
            StringBuilder sb = new StringBuilder();
            for (Map.Entry entry : item.entrySet()) {
                if (sb.length() > 0) {
                    sb.append("; ");
                }
                sb.append(entry.getKey()).append("=").append(entry.getValue());
            }
            System.out.println(sb.toString());
        }


        DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(amazonDynamoDB);


        System.out.println("ENTITY DATA");
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS("public"));
        DynamoDBQueryExpression<BareEntity> queryExpression = new DynamoDBQueryExpression<BareEntity>()
                .withKeyConditionExpression("ownerId = :val1")
                .withExpressionAttributeValues(eav)
                .withConsistentRead(false);;

        List<BareEntity> entities = dynamoDBMapper.query(BareEntity.class, queryExpression);
        for (BareEntity entity : entities) {
            System.out.println(entity);
        }
        System.out.println("TAG DATA BY ID");

        eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS("public"));
        eav.put(":val2", new AttributeValue().withS("Tag"));
        DynamoDBQueryExpression<Tag> tagQueryExpression = new DynamoDBQueryExpression<Tag>()
                .withKeyConditionExpression("ownerId = :val1 and begins_with(rangedKey, :val2)")
                .withExpressionAttributeValues(eav)
                .withConsistentRead(false);

        List<Tag> tags = dynamoDBMapper.query(Tag.class, tagQueryExpression);
        for (Tag tag : tags) {
            System.out.println(tag);
        }


        System.out.println("PROGRAM DATA");



    }

    public void insertEntities() {
        BareEntity entity = new BareEntity();
        entity.setOwnerId("public");
        entity.setRangedKey("BareEntity#1#0");
        entity.setStringAttr1("s1");
        entity.setStringAttr2("s2");
        entity.setStringAttr3("s3");
        entity.setStringAttr4("s4");
        entity.setStringAttr5("s5");
        DynamoDBMapper mapper = new DynamoDBMapper(amazonDynamoDB);
        mapper.save(entity);
    }

    public void insertTags() {
        Tag tag = new Tag();

        tag.setOwnerId("public");
        tag.setRangedKey("Tag#1#0");
        tag.setText("VERY_FIRST");

        DynamoDBMapper mapper = new DynamoDBMapper(amazonDynamoDB);
        mapper.save(tag);
    }

    public void insertPrograms() {
        Program program = new Program();

        program.setOwnerId("public");
        program.setRangedKey("Program#1#0");
        program.setText("VERY_FIRST PROGRAM TEXT");
        TreeSet<String> set = new TreeSet();
        set.add("VERY_FIRST");
        program.setTags(set);

        DynamoDBMapper mapper = new DynamoDBMapper(amazonDynamoDB);
        mapper.save(program);
    }

}

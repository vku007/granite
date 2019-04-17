package com.magjin.persistance;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Entity")
public class BareEntity {
    @DynamoDBHashKey
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "myGsi5")
    private String ownerId;

    @DynamoDBRangeKey
    private String rangedKey;

    @DynamoDBAttribute
    private String stringAttr1;

    @DynamoDBAttribute
    private String stringAttr2;

    @DynamoDBAttribute
    private String stringAttr3;

    @DynamoDBAttribute
    private String stringAttr4;

    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "myGsi5")
    @DynamoDBAttribute
    private String stringAttr5;

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getRangedKey() {
        return rangedKey;
    }

    public void setRangedKey(String rangedKey) {
        this.rangedKey = rangedKey;
    }

    public String getStringAttr1() {
        return stringAttr1;
    }

    public void setStringAttr1(String stringAttr1) {
        this.stringAttr1 = stringAttr1;
    }

    public String getStringAttr2() {
        return stringAttr2;
    }

    public void setStringAttr2(String stringAttr2) {
        this.stringAttr2 = stringAttr2;
    }

    public String getStringAttr3() {
        return stringAttr3;
    }

    public void setStringAttr3(String stringAttr3) {
        this.stringAttr3 = stringAttr3;
    }

    public String getStringAttr4() {
        return stringAttr4;
    }

    public void setStringAttr4(String stringAttr4) {
        this.stringAttr4 = stringAttr4;
    }

    public String getStringAttr5() {
        return stringAttr5;
    }

    public void setStringAttr5(String stringAttr5) {
        this.stringAttr5 = stringAttr5;
    }

    @Override
    public String toString() {
        return "BareEntity{" +
                "ownerId='" + ownerId + '\'' +
                ", rangedKey='" + rangedKey + '\'' +
                ", stringAttr1='" + stringAttr1 + '\'' +
                ", stringAttr2='" + stringAttr2 + '\'' +
                ", stringAttr3='" + stringAttr3 + '\'' +
                ", stringAttr4='" + stringAttr4 + '\'' +
                ", stringAttr5='" + stringAttr5 + '\'' +
                '}';
    }
}

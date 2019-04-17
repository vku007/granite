package com.magjin.persistance;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Entity")
public class Tag {
    @DynamoDBHashKey
    private String ownerId;

    @DynamoDBRangeKey
    private String rangedKey;

    @DynamoDBAttribute(attributeName="stringAttr1")
    private String text;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "ownerId='" + ownerId + '\'' +
                ", rangedKey='" + rangedKey + '\'' +
                ", text='" + text + '\'' +
                '}';
    }
}

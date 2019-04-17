package com.magjin.persistance;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIndexHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;

import java.util.Set;

@DynamoDBTable(tableName = "Entity")
public class Program {
    @DynamoDBHashKey
    @DynamoDBIndexHashKey(globalSecondaryIndexName = "myGsi5")
    private String ownerId;

    @DynamoDBRangeKey
    private String rangedKey;

    @DynamoDBAttribute(attributeName="stringAttr1")
    private String name;

    @DynamoDBAttribute(attributeName="stringAttr2")
    private String text;

    @DynamoDBTypeConverted(converter = TagSetConverter.class)
    @DynamoDBAttribute(attributeName="stringAttr5")
    private Set<String> tags;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Program{" +
                "ownerId='" + ownerId + '\'' +
                ", rangedKey='" + rangedKey + '\'' +
                ", name='" + name + '\'' +
                ", text='" + text + '\'' +
                ", tags=" + tags +
                '}';
    }
}

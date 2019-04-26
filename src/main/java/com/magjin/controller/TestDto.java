package com.magjin.controller;


public class TestDto {
    private String id;
    private String name;
    private String link;
    private String desc;

    public TestDto() {

    }

    public TestDto(String id, String name, String link, String desc) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.desc = desc;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

}

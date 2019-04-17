package com.magjin.persistance;


import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.util.Arrays;
import java.util.Iterator;
import java.util.TreeSet;

public class TagSetConverter implements DynamoDBTypeConverter<String, TreeSet<String>> {
    @Override
    public String convert(TreeSet<String> strings) {
        StringBuilder sb = new StringBuilder();
        Iterator<String> i = strings.iterator();
        boolean first = true;
        while (i.hasNext()) {
            if (first) {
                first = false;
            } else {
                sb.append("#");
            }
            sb.append(i.next());
        }


        return sb.toString();
    }

    @Override
    public TreeSet<String> unconvert(String s) {
        return new TreeSet<String>(Arrays.asList( s.split("#")));
    }
}

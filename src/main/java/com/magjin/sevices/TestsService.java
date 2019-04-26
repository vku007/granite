package com.magjin.sevices;

import com.magjin.controller.TestDto;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class TestsService {
    TestDto[] in = {
            new TestDto("1", "name1", "/tstDbSetup", "description1"),
            new TestDto("2", "name2", "/tstInserts", "description2"),
            new TestDto("3", "name3", "/tstInserts1", "description3")};

    List<TestDto> inner = Arrays.asList(in);

    public TestDto getTestById(String id) {
        if (id == null) {
            return null;
        }
        Optional<TestDto> opt =  inner.stream().filter(dto -> id.equals(dto.getId())).findFirst();
        return opt.orElse(null);
    }

    public List<TestDto> getAllTests() {
        return inner;

    }
}

package com.cognizant.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("test")
public class TestController {

    @Value("${spring.application.name}")
    private String server;

    @Value("${server.port}")
    private int port;

    private final AtomicInteger counter = new AtomicInteger();

    @GetMapping
    public TestDTO test() {
        return TestDTO.of(server, port, counter.getAndIncrement());
    }

}

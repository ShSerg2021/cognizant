package com.cognizant.web;

import com.cognizant.model.EventFeedDTO;
import com.cognizant.service.RedisMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("test")
@RequiredArgsConstructor
public class TestController {

    @Value("${spring.application.name}")
    private String server;

    @Value("${server.port}")
    private int port;

    private final RedisMessageService redisMessageService;

    private final AtomicInteger counter = new AtomicInteger();

    @GetMapping
    public TestDTO test() {
        return TestDTO.of(server, port, counter.getAndIncrement());
    }

    @PostMapping("event")
    public void sendEvent(@RequestBody EventFeedDTO eventFeed) {
        redisMessageService.sendEventFeed(eventFeed);
    }

}

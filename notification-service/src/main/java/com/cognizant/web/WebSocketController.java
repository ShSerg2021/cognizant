package com.cognizant.web;

import com.cognizant.model.WebSocketMessage;
import com.cognizant.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ws")
@RequiredArgsConstructor
public class WebSocketController {

    private final WebSocketService webSocketService;

    @PostMapping
    public void send(WebSocketMessage message) {
        webSocketService.send(message);
    }
}

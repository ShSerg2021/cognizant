package com.cognizant.service;

import com.cognizant.model.WebSocketMessage;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketServiceImpl implements WebSocketService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public void send(@NonNull WebSocketMessage event) {
        simpMessagingTemplate.convertAndSend("/notification/".concat(event.getReceiver()), event);
    }
}

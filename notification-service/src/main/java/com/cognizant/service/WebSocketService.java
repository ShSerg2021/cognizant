package com.cognizant.service;

import com.cognizant.model.WebSocketMessage;
import lombok.NonNull;

public interface WebSocketService {

    void send(@NonNull WebSocketMessage event);
}

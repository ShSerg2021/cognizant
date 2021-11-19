package com.cognizant.model;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class WebSocketMessage {
    private String receiver;
    private String type;
    private String body;
}

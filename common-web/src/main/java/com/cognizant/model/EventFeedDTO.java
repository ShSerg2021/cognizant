package com.cognizant.model;

import lombok.Data;

import java.util.List;

@Data
public class EventFeedDTO {
    private String event;
    private String type;
    private List<String> receivers;
}

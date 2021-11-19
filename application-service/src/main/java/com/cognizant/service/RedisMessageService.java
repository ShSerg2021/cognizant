package com.cognizant.service;

import com.cognizant.model.EventFeedDTO;
import lombok.NonNull;

public interface RedisMessageService {

    void sendEventFeed(@NonNull EventFeedDTO eventFeed);
}

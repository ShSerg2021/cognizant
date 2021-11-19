package com.cognizant.service;

import com.cognizant.model.EventFeedDTO;
import com.github.sonus21.rqueue.core.RqueueEndpointManager;
import com.github.sonus21.rqueue.core.RqueueMessageEnqueuer;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class RedisMessageServiceImpl implements RedisMessageService {

    @Value("${rqueue.name.event-feed}")
    private String eventFeedQueue;

    private final RqueueMessageEnqueuer rqueueMessageEnqueuer;

    private final RqueueEndpointManager rqueueEndpointManager;

    @PostConstruct
    public void init() {
        rqueueEndpointManager.registerQueue(eventFeedQueue);
    }

    @Override
    public void sendEventFeed(@NonNull EventFeedDTO eventFeed) {
        rqueueMessageEnqueuer.enqueue(eventFeedQueue, eventFeed);
    }
}

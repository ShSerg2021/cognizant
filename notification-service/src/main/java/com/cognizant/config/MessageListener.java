package com.cognizant.config;

import com.cognizant.model.EventFeedDTO;
import com.cognizant.service.EventFeedService;
import com.github.sonus21.rqueue.annotation.RqueueListener;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class MessageListener {

    private final EventFeedService eventFeedService;

    @RqueueListener(value = "${rqueue.name.event-feed}")
    public void processEventFeed(EventFeedDTO eventFeed) {
        log.info("Event feed {}", eventFeed);
        eventFeedService.process(eventFeed);
    }
}

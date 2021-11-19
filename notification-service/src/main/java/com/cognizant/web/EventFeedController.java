package com.cognizant.web;

import com.cognizant.domain.EventFeed;
import com.cognizant.service.EventFeedService;
import com.cognizant.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("event-feed")
@RequiredArgsConstructor
public class EventFeedController {

    private final EventFeedService eventFeedService;

    @GetMapping
    public List<EventFeed> getEventFeed() {
        return eventFeedService.findAllByEmail(SecurityUtils.getUserEmail());
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        eventFeedService.deleteByIdAndEmail(id, SecurityUtils.getUserEmail());
    }
}
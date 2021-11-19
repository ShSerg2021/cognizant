package com.cognizant.service;

import com.cognizant.domain.EventFeed;
import com.cognizant.model.EventFeedDTO;
import com.cognizant.model.WebSocketMessage;
import com.cognizant.repository.EventFeedRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class EventFeedServiceImpl implements EventFeedService {

    private final WebSocketService webSocketService;

    private final EventFeedRepository eventFeedRepository;

    @Override
    public void process(@NonNull EventFeedDTO eventFeed) {
        eventFeed.getReceivers().stream()
                .map(e -> new EventFeed().setEmail(e).setMessage(eventFeed.getEvent()).setType(eventFeed.getType()))
                .map(eventFeedRepository::save)
                .map(e -> new WebSocketMessage().setReceiver(e.getEmail()).setType("eventFeed").setBody("new"))
                .forEach(webSocketService::send);
    }

    @Override
    public List<EventFeed> findAllByEmail(@NonNull String email) {
        return eventFeedRepository.findAllByEmail(email);
    }

    @Override
    public void deleteByIdAndEmail(@NonNull UUID id, @NonNull String email) {
        eventFeedRepository.deleteByIdAndEmail(id, email);
    }

}

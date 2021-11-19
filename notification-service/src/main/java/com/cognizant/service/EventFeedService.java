package com.cognizant.service;

import com.cognizant.domain.EventFeed;
import com.cognizant.model.EventFeedDTO;
import lombok.NonNull;

import java.util.List;
import java.util.UUID;

public interface EventFeedService {

    void process(@NonNull EventFeedDTO eventFeed);

    List<EventFeed> findAllByEmail(@NonNull String email);

    void deleteByIdAndEmail(@NonNull UUID id, @NonNull String email);
}

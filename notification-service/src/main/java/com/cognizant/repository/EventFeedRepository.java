package com.cognizant.repository;

import com.cognizant.domain.EventFeed;
import lombok.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventFeedRepository extends BaseRepository<EventFeed> {

    List<EventFeed> findAllByEmail(@NonNull String email);

    void deleteByIdAndEmail(@NonNull UUID id, @NonNull String email);

}

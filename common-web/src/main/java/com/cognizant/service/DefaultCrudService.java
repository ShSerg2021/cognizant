package com.cognizant.service;

import com.cognizant.domain.BaseEntity;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public abstract class DefaultCrudService<T extends BaseEntity> implements CrudService<T> {

    private final Map<UUID, T> store = new ConcurrentHashMap<>();

    @Override
    public List<T> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<T> findById(@NonNull UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public T create(@NonNull T entity) {
        entity.setId(UUID.randomUUID());
        return store.put(entity.getId(), entity);
    }

    @Override
    public T update(@NonNull T entity) {
        return store.replace(entity.getId(), entity);
    }

    @Override
    public void delete(@NonNull UUID id) {
        store.remove(id);
    }
}

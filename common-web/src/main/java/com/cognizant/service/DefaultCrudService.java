package com.cognizant.service;

import com.cognizant.domain.BaseEntity;
import com.cognizant.repository.BaseRepository;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public abstract class DefaultCrudService<T extends BaseEntity, S extends BaseRepository<T>> implements CrudService<T> {

    @Setter(onMethod_ = {@Autowired})
    protected S repository;

    @Override
    public List<T> findAll() {
        return new ArrayList<>(repository.findAll());
    }

    @Override
    public Optional<T> findById(@NonNull UUID id) {
        return repository.findById(id);
    }

    @Override
    public T create(@NonNull T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(@NonNull T entity) {
        return repository.save(entity);
    }

    @Override
    public void delete(@NonNull UUID id) {
        repository.deleteById(id);
    }
}

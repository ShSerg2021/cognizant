package com.cognizant.service;

import com.cognizant.domain.BaseEntity;
import lombok.NonNull;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CrudService<T extends BaseEntity> {

    List<T> findAll();

    Optional<T> findById(@NonNull UUID id);

    T create(@NonNull T entity);

    T update(@NonNull T entity);

    void delete(@NonNull UUID id);
}

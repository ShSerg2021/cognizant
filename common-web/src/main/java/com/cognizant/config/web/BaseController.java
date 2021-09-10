package com.cognizant.config.web;

import com.cognizant.config.domain.BaseEntity;
import com.cognizant.config.service.CrudService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

public abstract class BaseController<T extends BaseEntity, S extends CrudService<T>> {

    @Setter(onMethod_ = {@Autowired})
    protected S service;

    @GetMapping
    public List<T> findAll() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public T findById(@PathVariable UUID id) {
        return service.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @PostMapping
    public T create(@RequestBody @Valid T entity) {
        return service.create(entity);
    }

    @PutMapping("{id}")
    public T update(@PathVariable UUID id, @RequestBody @Valid T entity) {
        return service.update(entity);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}

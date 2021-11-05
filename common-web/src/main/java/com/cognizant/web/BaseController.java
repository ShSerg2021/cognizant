package com.cognizant.web;

import com.cognizant.domain.BaseEntity;
import com.cognizant.service.CrudService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

@RequiredArgsConstructor
public abstract class BaseController<T extends BaseEntity, S extends CrudService<T>> {

    @Setter(onMethod_ = {@Autowired})
    protected S service;

    public final String readRole;

    public final String editRole;

    public final String deleteRole;

    @GetMapping
    @PreAuthorize("hasRole(this.readRole)")
    public List<T> findAll() {
        return service.findAll();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasRole(this.readRole)")
    public T findById(@PathVariable UUID id) {
        return service.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    @PostMapping
    @PreAuthorize("hasRole(this.editRole)")
    public T create(@RequestBody @Valid T entity) {
        return service.create(entity);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole(this.editRole)")
    public T update(@PathVariable UUID id, @RequestBody @Valid T entity) {
        return service.update(entity);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole(this.deleteRole)")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}

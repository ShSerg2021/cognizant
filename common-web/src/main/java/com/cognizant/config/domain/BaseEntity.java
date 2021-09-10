package com.cognizant.config.domain;

import lombok.Data;

import java.util.UUID;

@Data
public class BaseEntity {

    private UUID id;

    private boolean deleted;

}

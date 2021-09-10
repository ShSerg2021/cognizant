package com.cognizant.domain;

import com.cognizant.config.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends BaseEntity {

    private String name;

}

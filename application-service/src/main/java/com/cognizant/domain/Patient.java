package com.cognizant.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends BaseEntity {

    private String name;

}

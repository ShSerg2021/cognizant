package com.cognizant.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@Where(clause = "deleted=false")
public class EventFeed extends BaseEntity {

    private String email;

    private String type;

    private String message;
}

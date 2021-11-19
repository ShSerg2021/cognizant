create table event_feed
(
    id      uuid    not null
        constraint event_feed_pkey
            primary key,
    deleted boolean not null,
    email   varchar(255),
    message varchar(255),
    type    varchar(255)
);

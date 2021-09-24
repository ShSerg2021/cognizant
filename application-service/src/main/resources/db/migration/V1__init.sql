CREATE TABLE patient
(
    id      uuid primary key,
    deleted boolean     not null,
    name    varchar(50) not null unique
)
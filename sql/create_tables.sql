CREATE TABLE urls
(
    id SERIAL
        UNIQUE,
    url TEXT NOT NULL,
    hash TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
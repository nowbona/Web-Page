CREATE TABLE order_list
(
    id    		INT				NOT NULL    AUTO_INCREMENT  PRIMARY KEY,
    date        DATETIME        NOT NULL,
    name        CHAR(30)        NOT NULL,
    phone       CHAR(20)        NOT NULL,
    regular     CHAR            NOT NULL,
    eggSet      INT UNSIGNED    NOT NULL,
    price       INT UNSIGNED    NOT NULL,
    deposit     CHAR            NOT NULL,
    deliver     CHAR            NOT NULL
);

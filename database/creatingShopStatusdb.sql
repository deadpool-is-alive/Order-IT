USE orderit;

CREATE TABLE shop_settings (
    id INT PRIMARY KEY,
    is_open BOOLEAN NOT NULL
);

INSERT INTO shop_settings VALUES (1, true);

SELECT * FROM shop_settings;
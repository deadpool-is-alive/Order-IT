CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


INSERT INTO admins(username, password)
VALUES(
    'admin',
    '$2a$12$zlVbW8ZhCQP2OnhJAPT.deDsG3xMmdnkH4.IhQxEcanJt6GiJk2je'
);


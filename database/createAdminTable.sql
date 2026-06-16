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


DELETE FROM admins
WHERE username = 'admin';

SELECT * FROM admins;

CREATE TABLE admin_devices(
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    fcm_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY(admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

SELECT * FROM admin_devices;

ALTER TABLE admin_devices
ADD UNIQUE (fcm_token);

DESCRIBE admin_devices;
ALTER TABLE admin_devices
MODIFY COLUMN fcm_token VARCHAR(512) NOT NULL;
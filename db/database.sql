CREATE DATABASE games_db;
USE games_db;

CREATE TABLE genre (
idGenre int auto_increment primary key,
genre VARCHAR(45) NOT NULL
);

INSERT INTO genre (genre)
VALUES ('Action-adventure'), ('Action role-playing'), ('Sandbox'), ('Simulation')

CREATE TABLE games(
id int auto_increment primary key,
title VARCHAR(45),
cover VARCHAR(500),
year INT,
dev VARCHAR(45),
fk_Genre INT NOT NULL,
FOREIGN KEY (fk_Genre) REFERENCES genre (idGenre)
);

 INSERT INTO games (title, cover, year, dev, fk_Genre) 
 VALUES ('The Legend of Zelda: Breath of the Wild', 'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg', 2017, 'Nintendo', 1),
 ('Dark Souls III', 'https://image.api.playstation.com/cdn/EP0700/CUSA03365_00/OFMeAw2KhrdaEZAjW1f3tCIXbogkLpTC.png', 2016, 'FromSoftware', 2),
 ('Horizon Zero Dawn', 'https://upload.wikimedia.org/wikipedia/en/9/93/Horizon_Zero_Dawn.jpg', 2017, 'Guerrilla Games', 2),
 ('Minecraft', 'https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png', 2011, 'Mojang Studios', 3),
 ('Stardew Valley', 'https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png', 2016, 'ConcernedApe', 4)
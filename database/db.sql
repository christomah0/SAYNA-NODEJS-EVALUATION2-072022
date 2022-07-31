-- crée base de donnée
CREATE DATABASE d_clic
    DEFAULT CHARACTER SET = 'utf8mb4';

-- utilise la base de donnée
use d_clic;

-- crée la table contact
CREATE TABLE contact(
    idContact INT AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    avis VARCHAR(256) NOT NULL,
    note INT(1) NOT NULL,
    formation VARCHAR(20) NOT NULL,
    PRIMARY KEY(idContact)
) ENGINE=InnoDB;

-- obtient toute informations
SELECT * FROM contact;

-- supprime la table contact
DROP TABLE contact;

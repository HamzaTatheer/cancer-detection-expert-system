

#CREATE DATABASE `AI_MEDI_CARE_DB`; #THIS HAS BEEN DONE BY ROOT USER
#SELECT * FROM mysql.user in order to see users select correct user
#GRANT ALL PRIVILEGES ON AI_MEDI_CARE_DB.* TO 'user'@'%';

#for finding all tables
#SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
#FROM information_schema.tables
#WHERE table_schema = 'AI_MEDI_CARE_DB';

#for viewing attributes info of a table
#DESCRIBE AI_MEDI_CARE_DB.USER


USE `AI_MEDI_CARE_DB`;

CREATE TABLE `ROLE` (
`ID` INT4 NOT NULL,
`NAME` VARCHAR(50) NOT NULL,
PRIMARY KEY (`ID`)
);

CREATE TABLE `USER` (
`NAME` VARCHAR(50) NOT NULL,
`EMAIL` VARCHAR(50) NOT NULL,
`PASSWORD` VARCHAR(50) NOT NULL,
`ROLE` INT4 NOT NULL,
FOREIGN KEY (`ROLE`) REFERENCES ROLE(`ID`),
PRIMARY KEY (`EMAIL`));

INSERT INTO `ROLE` VALUES (0,'admin');
INSERT INTO `USER` VALUES ('hamza tatheer','hamzatatheer@gmail.com','12345678',0);

#if you use auto increment, you need to type primary key right after of it instead of declaring it in later lines
CREATE TABLE `PATIENT_FOR_WSI_CANCER_DETECTION` (
	`ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `STATUS` VARCHAR(50) NOT NULL,
    `FILE_LOC` VARCHAR(255),
    `RESULT_LOC` VARCHAR(255)
);

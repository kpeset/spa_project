CREATE TABLE member (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE species (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO species (name) VALUES
  ("Chien"),
  ("Chat"),
  ("NAC"),
  ("Mouton");

CREATE TABLE breed (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  species_id INT NOT NULL,
  FOREIGN KEY (species_id) REFERENCES species(id)
);

INSERT INTO breed (name, species_id) VALUES
  ("Berger Allemand", 1),
  ("Labrador", 1),
  ("Bulldog", 1),
  ("Siamois", 2),
  ("Persan", 2),
  ("Maine Coon", 2),
  ("Lapin Nain", 3),
  ("Furet", 3),
  ("Hamster Doré", 3),
  ("Perroquet", 3);

CREATE TABLE shelter (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  capacity INT NOT NULL
);

INSERT INTO shelter (name, address, capacity) VALUES
  ("Refuge de Genneviliers", "12 rue des animaux", 100),
  ("Refuge des flots bleus", "Entre Arcachon et le Moulou", 17),
  ("Refuge du soleil", "Rue du soleil", 200),
  ("Refuge Montagnard", "Hauteurs des Alpes", 50),
  ("Refuge du Grand Nord", "Toundra, Canada", 30),
  ("Refuge des Collines", "Vallée du Rhône", 40),
  ("Refuge Félin", "Rue des Chats, Lyon", 60),
  ("Refuge Paradise", "Avenue des Petits Animaux", 25),
  ("Refuge Canin", "Route des Chiens, Marseille", 90),
  ("Animaux en Détresse", "Rue de la Compassion, Paris", 80);

CREATE TABLE animal (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  tattooed BOOLEAN NOT NULL,
  vaccinated BOOLEAN NOT NULL,
  species_id INT NOT NULL,
  breed_id INT NOT NULL,
  gender VARCHAR(50) NOT NULL,
  age VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  shelter_id INT NOT NULL,
  FOREIGN KEY (species_id) REFERENCES species(id),
  FOREIGN KEY (breed_id) REFERENCES breed(id),
  FOREIGN KEY (shelter_id) REFERENCES shelter(id)
);

INSERT INTO animal (name, tattooed, vaccinated, species_id, breed_id, gender, age, description, photo, shelter_id) VALUES
  ("Rex", true, true, 1, 1, "Mâle", "Adulte", "Joueur et protecteur.", "/img/1.png", 1),
  ("Bella", false, true, 2, 4, "Femelle", "Junior", "Affectueuse et calme.", "/img/2.png", 1),
  ("Milo", true, true, 3, 7, "Mâle", "Jeune", "Curieux et sociable.", "/img/3.png", 1),
  ("Rocky", false, true, 1, 2, "Mâle", "Adulte", "Très intelligent.", "/img/4.png", 1),
  ("Luna", true, true, 2, 5, "Femelle", "Adulte", "Adore les câlins.", "/img/5.png", 1),
  ("Coco", false, true, 3, 10, "Femelle", "Bébé", "Perroquet bavard.", "/img/6.png", 2),
  ("Max", true, false, 1, 3, "Mâle", "Senior", "Doux et affectueux.", "/img/7.png", 2),
  ("Simba", false, true, 2, 6, "Mâle", "Adulte", "Très joueur.", "/img/8.png", 2),
  ("Fifi", true, false, 3, 8, "Femelle", "Junior", "Pleine d’énergie.", "/img/9.png", 3),
  ("Toby", false, true, 1, 1, "Mâle", "Adulte", "Loyal et sportif.", "/img/10.png", 3),
  ("Rex", true, true, 1, 1, "Mâle", "Adulte", "Joueur et protecteur.", "/img/1.png", 4),
  ("Bella", false, true, 2, 4, "Femelle", "Junior", "Affectueuse et calme.", "/img/2.png", 4),
  ("Milo", true, true, 3, 7, "Mâle", "Jeune", "Curieux et sociable.", "/img/3.png", 4),
  ("Rocky", false, true, 1, 2, "Mâle", "Adulte", "Très intelligent.", "/img/4.png", 4),
  ("Luna", true, true, 2, 5, "Femelle", "Adulte", "Adore les câlins.", "/img/5.png", 5),
  ("Coco", false, true, 3, 10, "Femelle", "Bébé", "Perroquet bavard.", "/img/6.png", 5),
  ("Max", true, false, 1, 3, "Mâle", "Senior", "Doux et affectueux.", "/img/7.png", 6),
  ("Simba", false, true, 2, 6, "Mâle", "Adulte", "Très joueur.", "/img/8.png", 7),
  ("Fifi", true, false, 3, 8, "Femelle", "Junior", "Pleine d’énergie.", "/img/9.png", 8),
  ("Toby", false, true, 1, 1, "Mâle", "Adulte", "Loyal et sportif.", "/img/10.png", 8),
  ("Sasha", true, true, 2, 4, "Femelle", "Jeune", "Timide mais douce.", "/img/11.png", 8),
  ("Charlie", false, false, 1, 3, "Mâle", "Junior", "Joueur et amical.", "/img/12.png", 8),
  ("Oscar", true, true, 1, 2, "Mâle", "Adulte", "Dynamique et sociable.", "/img/13.png", 8),
  ("Lily", false, true, 2, 6, "Femelle", "Bébé", "Curieuse et vive.", "/img/14.png", 8),
  ("Bobby", true, false, 3, 9, "Mâle", "Adulte", "Apprivoisé et affectueux.", "/img/15.png", 9),
  ("Nina", false, true, 2, 5, "Femelle", "Adulte", "Joueuse et câline.", "/img/16.png", 9),
  ("Rocky", true, true, 1, 1, "Mâle", "Jeune", "Énergique et fidèle.", "/img/17.png", 9),
  ("Choco", false, true, 3, 8, "Mâle", "Junior", "Très intelligent.", "/img/18.png", 9),
  ("Tina", true, false, 2, 4, "Femelle", "Adulte", "Affectueuse et calme.", "/img/19.png", 9),
  ("Ricky", false, true, 1, 3, "Mâle", "Adulte", "Garde attentif.", "/img/20.png", 10),
  ("Paco", true, false, 3, 10, "Mâle", "Bébé", "Adore chanter.", "/img/21.png", 10),
  ("Bella", false, true, 2, 5, "Femelle", "Adulte", "Sociable et douce.", "/img/22.png", 10),
  ("Felix", true, false, 3, 7, "Mâle", "Junior", "Indépendant et malin.", "/img/23.png", 10),
  ("Rusty", false, true, 1, 2, "Mâle", "Adulte", "Amical et joueur.", "/img/24.png", 10),
  ("Minnie", true, true, 2, 6, "Femelle", "Jeune", "Curieuse et vive.", "/img/25.png", 10),
  ("Jack", false, false, 1, 1, "Mâle", "Junior", "Joueur et sociable.", "/img/26.png", 10),
  ("Tommy", true, true, 3, 8, "Mâle", "Adulte", "Affectueux et curieux.", "/img/27.png", 10),
  ("Ruby", false, true, 2, 5, "Femelle", "Adulte", "Dynamique et douce.", "/img/28.png", 10);

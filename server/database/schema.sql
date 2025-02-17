create table shelter (
  id int PRIMARY KEY AUTO_INCREMENT not null,
  name VARCHAR(255) not null,
  address VARCHAR(255) not null,
  capacity INT not null
);

INSERT INTO shelter (name, address, capacity) VALUES ("Refuge de Genneviliers", "12 rue des animaux", 100), ("Refuge des flots bleus", "Entre Archachon et le Moulou", 17), ("Refuge du soleil", "Rue du soleil", 200);

-- //     id: 1,
-- //     name: "Rex",
-- //     tattooed: true,
-- //     vaccinated: true,
-- //     species: "Chien",
-- //     gender: "Mâle",
-- //     age: "Adulte",
-- //     breed: "Berger Allemand",
-- //     shelterName: "Refuge des Amis Fidèles",
-- //     description: "Très joueur et protecteur, idéal pour une famille active.",
-- //     photo: "/img/1.png",

create table animal (
  id int primary key AUTO_INCREMENT not null,
  name VARCHAR(255) not null,
  tattooed boolean not null,
  vaccinated boolean not null,
  species VARCHAR(50) not null,
  gender VARCHAR(50) not null,
  age VARCHAR(50) not null,
  breed VARCHAR(255) not null,
  description VARCHAR(255) not null,
  photo VARCHAR(255) not null,
  shelter_id int not null,
  Foreign Key (shelter_id) REFERENCES shelter(id)
);

INSERT INTO animal (name, tattooed, vaccinated, species, gender, age, breed, description, photo, shelter_id) VALUES
  ("Rex", true, true, "Chien", "Mâle", "Adulte", "Berger Allemand", "Très joueur et protecteur, idéal pour une famille active.", "/img/1.png", 1),
  ("Pouffi", false, true, "Chat", "Femelle", "Junior", "Siamois", "Affectueux et calme, parfait pour un appartement.", "/img/2.png", 1);

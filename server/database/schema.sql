create table shelter (
  id int PRIMARY KEY AUTO_INCREMENT not null,
  name VARCHAR(255) not null
);

INSERT INTO shelter (name) VALUES ("Refuge de Genneviliers"), ("Refuge des flots bleus"), ("Refuge du soleil");

create table animal (
  id int primary key AUTO_INCREMENT not null,
  name VARCHAR(255) not null,
  shelter_id int not null,
  Foreign Key (shelter_id) REFERENCES shelter(id)
);

INSERT INTO animal (name, shelter_id) VALUES ("Pouffi", 1), ("Rex", 3);

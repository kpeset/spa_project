import axios from "axios";

const getAllShelters = () => {
  return axios
    .get("http://localhost:3310/api/shelters")
    .then((response) => response.data);
};

const getAllAnimalsByShelter = (id: string) => {
  return axios
    .get(`http://localhost:3310/api/shelters/${id}/animals`)
    .then((response) => response.data);
};

const getSpecies = () => {
  return axios
    .get("http://localhost:3310/api/species")
    .then((response) => response.data);
};

export { getAllShelters, getAllAnimalsByShelter, getSpecies };

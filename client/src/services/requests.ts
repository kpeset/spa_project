import axios from "axios";

const getAllShelters = () => {
  return axios
    .get("http://localhost:3310/api/shelters")
    .then((response) => response.data);
};

export { getAllShelters };

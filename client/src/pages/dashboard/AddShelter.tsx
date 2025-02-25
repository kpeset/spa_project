import axios from "axios";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";

export default function AddShelter() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(undefined as undefined | number);

  const { revalidate } = useRevalidator();

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/shelters/", {
        name: name,
        address: address,
        capacity: capacity,
      })
      .then((response) => {
        console.info(response);
        revalidate();
      })
      .catch((error) => console.error(error));
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };

  const handleChangeCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(e.currentTarget.value));
  };

  return (
    <>
      <h2>Ajouter un refuge</h2>
      <form onSubmit={sendForm}>
        <p>Nom du refuge</p>
        <input type="text" onChange={handleChangeName} />
        <p>Adresse</p>
        <input type="text" onChange={handleChangeAddress} />
        <p>Capacité</p>
        <input type="text" onChange={handleChangeCapacity} />
        <input type="submit" />
      </form>
    </>
  );
}

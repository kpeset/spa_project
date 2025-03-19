import axios from "axios";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";

export default function AddShelter() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(undefined as undefined | number);
  const [picture, setPicture] = useState(undefined as undefined | File);

  const { revalidate } = useRevalidator();

  const formData = new FormData();

  formData.append("name", name);
  formData.append("capacity", String(capacity));
  formData.append("address", address);
  formData.append("picture", String(picture));

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/shelters/", formData)
      .then(() => {
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

  const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      setPicture(e.currentTarget.files[0]);
    }
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
        <p>Photo</p>
        <input type="file" onChange={handleChangePicture} />
        <input type="submit" />
      </form>
    </>
  );
}

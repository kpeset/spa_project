import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [id, setId] = useState(undefined as undefined | number);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(undefined as undefined | number);

  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/shelters/", {
        id: id,
        name: name,
        address: address,
        capacity: capacity,
      })
      .then((response) => console.info(response))
      .catch((error) => console.error(error));
  };

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(e.currentTarget.value));
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

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/animals")
      .then((response) => console.info(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
      <form onSubmit={sendForm}>
        <p>ID du refuge</p>
        <input type="text" onChange={handleChangeId} />
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

export default App;

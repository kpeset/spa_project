import axios from "axios";
import { useState } from "react";

import { useAuth } from "../../services/AuthContext";

export default function Auth() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { setRole } = useAuth();

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3310/api/login", credentials, {
        withCredentials: true,
      })
      .then((response) => {
        // changer l'état de role
        setRole(response.data.role);
        console.info(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={sendCredentials}>
      <p>Email</p>
      <input
        type="email"
        name="email"
        onChange={handleChangeCredentials}
        value={credentials.email}
      />
      <p>Password</p>
      <input
        type="password"
        name="password"
        onChange={handleChangeCredentials}
        value={credentials.password}
      />
      <input type="submit" />
    </form>
  );
}

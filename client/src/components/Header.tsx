import { useAuth } from "../services/AuthContext";

import { Link } from "react-router-dom";

export default function Header() {
  const { role, setRole } = useAuth();

  const disconnet = () => {
    setRole("anonymous");
  };

  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "admin"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["admin"],
    },
    {
      name: "Se connecter",
      path: "/auth",
      role: ["anonymous"],
    },
    {
      name: "Liste des membres",
      path: "/members",
      role: ["admin"],
    },
  ];

  return (
    <header>
      <h1>SPA</h1>
      <h2>{role === "admin" ? "Bienvenue admin" : "Bienvenue"}</h2>
      {role !== "anonymous" ? (
        <button type="button" onClick={disconnet}>
          Se déconnecter
        </button>
      ) : null}

      <nav>
        <ul>
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>SPA</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

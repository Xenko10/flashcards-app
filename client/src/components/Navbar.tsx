import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <Link to='/' className={styles.siteName}>
        Flashcards
      </Link>
      <ul>
        <CustomLink to='/createsetform'>Create Set</CustomLink>
        <CustomLink to='/flashcards'>Flashcards</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }: any) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li>
      <Link className={isActive ? "active" : ""} to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

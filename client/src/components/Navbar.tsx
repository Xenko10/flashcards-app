import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to='/' className='site-title'>
        Site Name
      </Link>
      <ul>
        <CustomLink to='/CreateSet'>Create Set</CustomLink>
        <CustomLink to='/Flashcards'>Flashcards</CustomLink>
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

import { Link } from "react-router-dom";

export default function LinkComponent({
  setName,
  subpageName,
}: {
  setName: string;
  subpageName: string;
}) {
  return (
    <li>
      <Link to={`/${subpageName}/${setName}`}>{setName}</Link>
    </li>
  );
}

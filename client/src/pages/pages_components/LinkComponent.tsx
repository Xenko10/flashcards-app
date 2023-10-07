import { Link } from "react-router-dom";

export default function LinkComponent({
  setName,
  page,
}: {
  setName: string;
  page: string;
}) {
  return (
    <li>
      <Link to={`/${page}/${setName}`}>{setName}</Link>
    </li>
  );
}

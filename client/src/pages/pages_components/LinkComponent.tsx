import { Link } from "react-router-dom";

export default function LinkComponent({
  set,
  page,
}: {
  set: string;
  page: string;
}) {
  return (
    <li>
      <Link to={`/${page}/${set}`}>{set}</Link>
    </li>
  );
}

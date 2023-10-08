import { Link } from "react-router-dom";

type Props = {
  setName: string;
  subpageName: string;
};

export default function LinkComponent({ setName, subpageName }: Props) {
  return (
    <li>
      <Link to={`/${subpageName}/${setName}`}>{setName}</Link>
    </li>
  );
}

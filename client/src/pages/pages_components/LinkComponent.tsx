import { Link } from "react-router-dom";

export default function ListComponent({ set }: { set: string }) {
  return <Link to={`/flashcard/${set}`}>{set}</Link>;
}

import { useParams } from "react-router-dom";

export default function FlashcardPage() {
  const { flashcardId } = useParams();
  return <div>{flashcardId}</div>;
}

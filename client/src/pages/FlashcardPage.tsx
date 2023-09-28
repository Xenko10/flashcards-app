import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlashcardPage() {
  const [qnaList, setQnaList] = useState([]);
  const { flashcardId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5174/getquestions/${flashcardId}`)
      .then((res: any) => {
        setQnaList(res.data);
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  useEffect(() => {
    console.log(qnaList);
  }, [qnaList]);

  return <div>asd</div>;
}

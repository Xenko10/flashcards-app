import { useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import styles from "./css/UseFlashcardSet.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Action {
  type: string;
  payload?: { amount: number };
}

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

function reducer(count: number, action: Action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return count + 1;
    case ACTIONS.DECREMENT:
      return count - 1;
    default:
      return count;
  }
}

export default function UseFlashcardSet() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [qnaList, setQnaList] = useState([{ question: "", answer: "" }]);
  const [isQuestion, setIsQuestion] = useState(true);
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

  return (
    <div className={styles.main}>
      <div
        className={styles.content}
        onClick={() => {
          setIsQuestion(!isQuestion);
        }}>
        {qnaList.length > count
          ? isQuestion
            ? qnaList[count].question
            : qnaList[count].answer
          : ""}
      </div>
      <div className={styles.arrowsCountWrapper}>
        <ArrowBackIosIcon
          className={styles.arrow}
          color={count === 0 ? "disabled" : undefined}
          onClick={
            count > 0
              ? () => {
                  dispatch({ type: ACTIONS.DECREMENT });
                  setIsQuestion(true);
                }
              : () => {}
          }
          viewBox='-6 0 24 24'
        />
        <div>
          {count + 1} / {qnaList.length}
        </div>
        <ArrowForwardIosIcon
          className={styles.arrow}
          color={count === qnaList.length - 1 ? "disabled" : undefined}
          onClick={
            count < qnaList.length - 1
              ? () => {
                  dispatch({ type: ACTIONS.INCREMENT });
                  setIsQuestion(true);
                }
              : () => {}
          }
        />
      </div>
    </div>
  );
}

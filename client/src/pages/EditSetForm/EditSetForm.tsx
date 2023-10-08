import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import styles from "./EditSetForm.module.css";
import { useEffect } from "react";
import { API_URL } from "../../constant";

interface QnaItem {
  question: string;
  answer: string;
}

type FormValues = {
  tableName: string;
  qnaArray: QnaItem[];
};

export default function EditSetForm() {
  const navigate = useNavigate();
  const { flashcardId } = useParams();
  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      tableName: flashcardId,
      qnaArray: [{ question: "", answer: "" }],
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/set/${flashcardId}`)
      .then((res) => {
        setValue("qnaArray", res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, [flashcardId, setValue]);

  const { fields, append, remove } = useFieldArray({
    name: "qnaArray",
    control,
  });

  const onSubmit = (data: FormValues) => {
    if (data.qnaArray.length === 0) return;
    try {
      axios.delete(`${API_URL}/set/${flashcardId}`);
      axios.post(`${API_URL}/set`, {
        qnaArray: data.qnaArray,
        tableName: flashcardId,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.h1TableNameInfo}>Editing: {flashcardId} set</h1>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.questionWrapper}>
            <h2 className={styles.h2QuestionNumber}>Question {index + 1}</h2>
            <div className={styles.textareaWrapper}>
              <textarea
                placeholder='question'
                {...register(`qnaArray.${index}.question`, {
                  required: true,
                  maxLength: 1000,
                })}
              />
              <textarea
                placeholder='answer'
                {...register(`qnaArray.${index}.answer`, {
                  required: true,
                  maxLength: 1000,
                })}
              />
            </div>
            <button
              type='button'
              onClick={() => remove(index)}
              className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
        <div className={styles.buttonWrapper}>
          <button
            type='button'
            onClick={() =>
              append({
                question: "",
                answer: "",
              })
            }>
            Add new question
          </button>
          <input type='submit' value='Submit' />
        </div>
      </form>
    </div>
  );
}

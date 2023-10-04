import { useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import styles from "./css/EditSetForm.module.css";
import { useEffect } from "react";

interface QnaItem {
  question: string;
  answer: string;
}

type FormValues = {
  tableName: string;
  qnaArray: QnaItem[];
};
export default function EditSetForm() {
  const { flashcardId } = useParams();
  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      tableName: flashcardId,
      qnaArray: [{ question: "", answer: "" }],
    },
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5174/getquestions/${flashcardId}`)
      .then((res: any) => {
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

  const onSubmit = async (data: FormValues) => {
    if (data.qnaArray.length === 0) return;
    try {
      axios.delete(`http://localhost:5174/delete/${flashcardId}`);
      const response = await axios.post("http://localhost:5174/insert", {
        qnaArray: data.qnaArray,
        tableName: flashcardId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.h1TableNameInfo}>Editing: {flashcardId} set</h1>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className={styles.questionWrapper}>
              <section className={styles.section} key={field.id}>
                <h2 className={styles.h2QuestionNumber}>
                  Question {index + 1}
                </h2>
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
              </section>
            </div>
          );
        })}
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

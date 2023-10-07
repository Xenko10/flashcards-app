import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import styles from "./css/CreateSetForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface QnaItem {
  question: string;
  answer: string;
}

type FormValues = {
  tableName: string;
  qnaArray: QnaItem[];
};

export default function CreateSetForm() {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      tableName: "",
      qnaArray: [{ question: "", answer: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "qnaArray",
    control,
  });
  const [setsName, setSetsName] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5174/getsets")
      .then((res: any) => {
        setSetsName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  function validate(tableName: string, arrayLength: number) {
    if (tableName === "") {
      setError("You must type name of the set");
      return false;
    }
    if (arrayLength === 0) {
      setError("You must add at least one question and answer");
      return false;
    }
    if (
      setsName
        .map((setNameObject: any) => setNameObject.Tables_in_flashcards)
        .includes(tableName)
    ) {
      setError("This set name already exists");
      return false;
    }
    return true;
  }

  const onSubmit = (data: FormValues) => {
    const tableName = data.tableName;
    const arrayLength = data.qnaArray.length;
    const isValid = validate(tableName, arrayLength);
    if (isValid) {
      try {
        axios.post("http://localhost:5174/insert", {
          qnaArray: data.qnaArray,
          tableName: tableName,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.h1TableNameInfo}>Type name of the set: </h1>
        <textarea
          placeholder='set name'
          {...register("tableName")}
          className={styles.tableNameTextArea}
        />
        {error && <p className={styles.error}>{error}</p>}
        {fields.map((field, index) => {
          return (
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

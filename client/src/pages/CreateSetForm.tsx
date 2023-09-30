import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import styles from "./css/CreateSetForm.module.css";

interface QnaItem {
  question: string;
  answer: string;
}

type FormValues = {
  tableName: string;
  qnaArray: QnaItem[];
};

export default function CreateSetForm() {
  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      qnaArray: [{ question: "", answer: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "qnaArray",
    control,
  });
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("http://localhost:5174/insert", {
        qnaArray: data.qnaArray,
        tableName: data.tableName,
      });
      console.log(response.data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.tableNameInfo}>Type name of the set: </h1>
        <textarea
          placeholder='table name'
          {...register("tableName", {
            required: true,
          })}
          className={styles.tableNameTextArea}
        />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={styles.section} key={field.id}>
                <h2>Question {index + 1}</h2>
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

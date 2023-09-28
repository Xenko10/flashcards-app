import styles from "../css/CreateSetForm.module.css";

type Props = {
  index: number;
  register: any;
};

export default function QuestionForm({ index, register }: Props) {
  const questionFieldName = `question${index}`;
  const answerFieldName = `answer${index}`;
  return (
    <div className={styles.questionForm}>
      <div className={styles.questionNrDiv}>flashcard {index + 1}</div>
      <div className={styles.inputWrapper}>
        <div className={styles.input}>
          Question
          <textarea
            {...register(questionFieldName, {
              required: true,
              maxLength: 1000,
            })}
          />
        </div>
        <div className={styles.input}>
          Answer
          <textarea
            {...register(answerFieldName, {
              required: true,
              maxLength: 1000,
            })}
          />
        </div>
      </div>
    </div>
  );
}

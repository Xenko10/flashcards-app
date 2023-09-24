type Props = {
  index: number;
  register: any;
  errors: any;
};

export default function QuestionForm({ index, register, errors }: Props) {
  const questionFieldName = `question${index}`;
  const answerFieldName = `answer${index}`;
  return (
    <div>
      <p>question nr {index + 1}</p>
      <input
        {...register(questionFieldName, {
          required: true,
        })}
      />
      <input {...register(answerFieldName)} />
      {errors.question && <span>This field is required</span>}
    </div>
  );
}

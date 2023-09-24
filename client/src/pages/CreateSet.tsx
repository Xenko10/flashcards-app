import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type Inputs = {
  question: string;
  answer: string;
};

export default function CreateSet() {
  const [uuids, setNewUuid] = useState<string[]>([uuidv4()]);

  function handleNewUuid() {
    setNewUuid((prevUuids: any) => [...prevUuids, uuidv4()]);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataArray = uuids.map((_uuid, index) => [
      data[`question${index}` as keyof Inputs],
      data[`answer${index}` as keyof Inputs],
    ]);

    axios.post("http://localhost:5174/insert", { dataArray });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {uuids.map((uuid, index) => {
        const questionFieldName = `question${index}`;
        const answerFieldName = `answer${index}`;
        return (
          <div key={uuid}>
            <p>question nr {++index}</p>
            <input
              {...register(questionFieldName as "question", {
                required: true,
              })}
            />
            <input {...register(answerFieldName as "answer")} />
            {errors.question && <span>This field is required</span>}
          </div>
        );
      })}
      <input type='submit' value='Submit' />
      <button onClick={handleNewUuid}>New question</button>
    </form>
  );
}

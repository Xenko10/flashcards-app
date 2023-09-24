import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QuestionForm from "./pages_components/QuestionForm";

type Inputs = any;

export default function CreateSet() {
  const [uuids, setNewUuid] = useState<string[]>([uuidv4()]);

  function handleNewUuid() {
    setNewUuid((prevUuids) => [...prevUuids, uuidv4()]);
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
      {/* add name of the set input */}
      {uuids.map((uuid, index) => {
        return (
          <QuestionForm
            index={index}
            key={uuid}
            register={register}
            errors={errors}
          />
        );
      })}
      <input type='submit' value='Submit' />
      <button onClick={handleNewUuid}>New question</button>
    </form>
  );
}

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
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataArray = uuids.map((_uuid, index) => [
      data[`question${index}` as keyof Inputs],
      data[`answer${index}` as keyof Inputs],
    ]);
    const setTableName = data["setTableName"];
    axios.post("http://localhost:5174/insert", { dataArray, setTableName });
    // add page where it shows that it was successful or there was an error
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("setTableName")} />
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

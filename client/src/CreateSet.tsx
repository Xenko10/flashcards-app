import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
  question: string;
  answer: string;
};

export default function CreateSet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post("http://localhost:5174/insert", { data });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue='question' {...register("question")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("answer", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.question && <span>This field is required</span>}

      <input type='submit' />
    </form>
  );
}

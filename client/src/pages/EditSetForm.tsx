import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

interface QnaItem {
  question: string;
  answer: string;
}

type FormValues = {
  tableName: string;
  qnaArray: QnaItem[];
};

export default function EditSetForm() {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Type name of the set: </div>
        <textarea
          {...register("tableName", {
            required: true,
          })}
        />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <h2>Question {index + 1}</h2>
                <textarea
                  placeholder='question'
                  {...register(`qnaArray.${index}.question`, {
                    required: true,
                  })}
                />
                <textarea
                  placeholder='answer'
                  {...register(`qnaArray.${index}.answer` as const, {
                    required: true,
                  })}
                />

                <button type='button' onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        <button
          type='button'
          onClick={() =>
            append({
              question: "",
              answer: "",
            })
          }>
          APPEND
        </button>
        <input type='submit' />
      </form>
    </div>
  );
}

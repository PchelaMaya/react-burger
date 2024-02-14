import { useState } from "react";

type TInputValue = {
  [name: string]: string;
};

export function useForm(values: TInputValue) {
  const [inputValues, setInputValues] = useState(values);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return { inputValues, handleChange, setInputValues };
}

import { useState } from "react";

export function useForm(values) {
  const [inputValues, setInputValues] = useState(values);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return { inputValues, handleChange, setInputValues };
}

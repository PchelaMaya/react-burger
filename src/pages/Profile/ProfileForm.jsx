import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { getCurrentUser } from "../../services/reducers";
import { updateUser } from "../../services/actions/CurrentUser";

export const ProfileForm = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setInputValues({ ...currentUser, password: "" });
  }, []);

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setDisabled(false);
  };

  const { inputValues, handleChange, setInputValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(inputValues));
  }

  function clickCancel(e) {
    e.preventDefault();

    setInputValues({ ...currentUser, password: "" });
    setDisabled(true);
  }

  const buttonsActive = useMemo(() => {
    return (
      currentUser.name !== inputValues.name ||
      currentUser.email !== inputValues.email ||
      inputValues.password !== ""
    );
  }, [inputValues.name, inputValues.email, inputValues.password]);

  const buttonsBlockClassName = `mt-10  ${buttonsActive === true ? "" : ""}`;
  return (
    <form action="">
      <Input
        placeholder="Имя"
        ref={inputRef}
        disabled={disabled}
        icon={"EditIcon"}
        value={inputValues.name}
        onChange={handleChange}
        onIconClick={onIconClick}
        name="name"
      />
      <EmailInput
        placeholder="Логин"
        name="email"
        value={inputValues.email}
        onChange={handleChange}
        isIcon={true}
      />
      <PasswordInput
        icon="EditIcon"
        name="password"
        value={inputValues.password}
        onChange={handleChange}
      />

      <div className={buttonsBlockClassName}>
        <Button
          type="secondary"
          size="medium"
          onClick={clickCancel}
          htmlType="button"
        >
          Отмена
        </Button>
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          htmlType="submit"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

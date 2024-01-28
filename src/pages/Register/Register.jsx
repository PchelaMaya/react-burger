import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Register.module.scss";
import { useForm } from "../../hooks/useForm";
import { Form } from "../../components/Form/Form";
import { registerUser } from "../../services/actions/CurrentUser";

export const Register = () => {
  const dispatch = useDispatch();

  const { inputValues, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmitSend(e) {
    e.preventDefault();

    dispatch(registerUser(inputValues));
  }

  return (
    <>
      <Form
        title="Регистрация"
        textButton="Зарегистрироваться"
        formName="formRegister"
        handleSubmitSend={handleSubmitSend}
      >
        <Input
          placeholder="Имя"
          value={inputValues.name}
          onChange={handleChange}
          name="name"
        />
        <EmailInput
          placeholder="E-mail"
          value={inputValues.email}
          onChange={handleChange}
          name="email"
          type="email"
        />
        <PasswordInput
          value={inputValues.password}
          onChange={handleChange}
          name="password"
        />
      </Form>

      <div className={`mt-20 ${styles.block}`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link to="/login" className={styles.link} type="submit">
          Войти
        </Link>
      </div>
    </>
  );
};

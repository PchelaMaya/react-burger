import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Login.module.scss";
import { useForm } from "../../hooks/useForm";
import { Form } from "../../components/Form/Form";
import { loginUser } from "../../services/actions/CurrentUser";
import { useDispatch } from "../../utils/typeHooks";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inputValues, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmitSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(loginUser(inputValues, navigate));
  }
  return (
    <>
      <Form
        title="Вход"
        textButton="Войти"
        formName="formLogin"
        handleSubmitSend={handleSubmitSend}
      >
        <EmailInput
          placeholder="E-mail"
          value={inputValues.email}
          onChange={handleChange}
          name="email"
        />
        <PasswordInput
          value={inputValues.password}
          onChange={handleChange}
          name="password"
        />
      </Form>

      <div className={`mt-20 mb-4 ${styles.block}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>

      <div className={styles.block}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </div>
    </>
  );
};

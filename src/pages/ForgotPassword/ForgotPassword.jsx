import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.scss";
import { useForm } from "../../hooks/useForm";
import { Form } from "../../components/Form/Form";
import { forgotPassword } from "../../services/actions/CurrentUser";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inputValues, handleChange } = useForm({ email: "" });

  function callback() {
    navigate("/reset-password", { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(forgotPassword(inputValues.email, callback));
  }
  return (
    <>
      <Form
        title="Восстановление пароля"
        textButton="Восстановить"
        formName="formForgotPassword"
        handleSubmitSend={handleSubmit}
      >
        <EmailInput
          placeholder="Укажите e-mail"
          type="email"
          onChange={handleChange}
          value={inputValues.email}
          name="email"
        />
      </Form>

      <div className={`mt-20 ${styles.block}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </>
  );
};

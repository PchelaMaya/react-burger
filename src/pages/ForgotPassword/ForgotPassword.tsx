import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPassword.module.scss";
import { useForm } from "../../hooks/useForm";
import { Form } from "../../components/Form/Form";
import { forgotPassword } from "../../services/actions/CurrentUser";
import { openResetPasswordPage } from "../../services/actions/ResetPassword";
import { useAppDispatch } from "../../utils/typeHooks";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { inputValues, handleChange } = useForm({ email: "" });

  function callback() {
    dispatch(openResetPasswordPage());
    navigate("/reset-password", { replace: true });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPassword.module.scss";
import { useForm } from "../../hooks/useForm";
import { Form } from "../../components/Form/Form";

import { resetPassword } from "../../services/actions/CurrentUser";
import { getIsOpenResetPasswordPage } from "../../services/reducers";
import { useAppDispatch, useSelector } from "../../utils/typeHooks";

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpenResetPasswordPage = useSelector(getIsOpenResetPasswordPage);

  const { inputValues, handleChange } = useForm({
    password: "",
    token: "",
  });

  function callback() {
    navigate("/login", { replace: true });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    dispatch(resetPassword(inputValues.password, inputValues.token, callback));
  }

  return (
    <>
      {!isOpenResetPasswordPage ? (
        <p className="mt-30 text text_type_main-large">
          Страница сейчас в космосе
        </p>
      ) : (
        <>
          <Form
            title="Восстановление пароля"
            textButton="Сохранить"
            formName="formResetPassword"
            handleSubmitSend={handleSubmit}
          >
            <PasswordInput
              placeholder="Введите новый пароль"
              onChange={handleChange}
              value={inputValues.password}
              name="password"
            />
            <Input
              placeholder="Введите код из письма"
              name="token"
              value={inputValues.token}
              onChange={handleChange}
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
      )}
    </>
  );
};

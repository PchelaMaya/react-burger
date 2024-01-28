import styles from "./Form.module.scss";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Form = ({
  title,
  children,
  formName,
  textButton,
  handleSubmitSend,
}) => {
  return (
    <div className={`${styles.content}`}>
      <h2 className={`text text_type_main-medium mb-6`}>{title}</h2>
      <form name={formName} id={formName} onSubmit={handleSubmitSend}>
        {children}
        <Button type="primary" size="medium" htmlType="submit">
          {textButton}
        </Button>
      </form>
    </div>
  );
};

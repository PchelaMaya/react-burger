import { Link } from "react-scroll";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.scss";

interface ITabs {
  current: string;
  setCurrent: (value: string) => void;
}
export const Tabs = ({ current, setCurrent }: ITabs) => {
  const scrollSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`mt-5 ${styles.tabs}`}>
      <Link
        to="bun"
        smooth={true}
        offset={5}
        duration={0}
        onSetActive={() => setCurrent("Булки")}
        containerId="containerElement"
        onClick={() => {
          setCurrent("Булки");
          scrollSection("bun");
        }}
      >
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={() => setCurrent("Булки")}
        >
          Булки
        </Tab>
      </Link>

      <Link
        to="sauce"
        smooth={true}
        offset={5}
        duration={0}
        onSetActive={() => setCurrent("Соусы")}
        containerId="containerElement"
        onClick={() => {
          setCurrent("Соусы");
          scrollSection("sauce");
        }}
      >
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={() => setCurrent("Соусы")}
        >
          Соусы
        </Tab>
      </Link>

      <Link
        to="main"
        smooth={true}
        offset={5}
        duration={0}
        onSetActive={() => setCurrent("Начинки")}
        containerId="containerElement"
        onClick={() => {
          setCurrent("Начинки");
          scrollSection("main");
        }}
      >
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={() => setCurrent("Начинки")}
        >
          Начинки
        </Tab>
      </Link>
    </div>
  );
};

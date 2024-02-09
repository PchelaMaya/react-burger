import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { UPDATE_SORT_INGREDIENTS } from "../../../../services/actions/BurgerConstructor";
import styles from "./ConstructorContent.module.scss";
import { useDispatch } from "../../../../utils/typeHooks";

interface IBurgerConstructorContent {
  children?: React.ReactNode;
  index: number;
}

interface IItemId {
  index: number;
}

export const ConstructorContent = ({
  index,
  children,
}: IBurgerConstructorContent) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isHover }, dropRef] = useDrop<any, any, any>({
    accept: "ingridient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: IItemId) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({
        type: UPDATE_SORT_INGREDIENTS,
        dragIndex: Number(dragIndex),
        hoverIndex: Number(hoverIndex),
      });
      item.index = index;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingridient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const classNameIsDragging = "mt-10";
  if (isDragging) {
    children = "";
  }

  const classNameIsHoverOnDropElement = styles.isActive;

  dragRef(dropRef(ref));

  return (
    <div
      className={`m-0 p-0 ${isDragging && classNameIsDragging} ${
        isHover && classNameIsHoverOnDropElement
      }`}
      ref={ref}
    >
      {children}
    </div>
  );
};

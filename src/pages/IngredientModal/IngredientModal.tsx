import { IngredientDetails } from "../../components/Modals/IngredientDetails/IngredientDetails";
import { Modal } from "../../components/Modals/Modal/Modal";
import { TClosePopup } from "../../utils/types";

export const IngredientModal = ({ onClose }: TClosePopup) => {
  return (
    <Modal onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};

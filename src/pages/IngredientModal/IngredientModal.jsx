import { IngredientDetails } from "../../components/Modals/IngredientDetails/IngredientDetails";
import { Modal } from "../../components/Modals/Modal/Modal";
import PropTypes from "prop-types";

export const IngredientModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};

IngredientModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

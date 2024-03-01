import { FC } from "react";
import { Modal } from "../Modal/Modal";
import { OrderFeed } from "../../OrderFeed/OrderFeed";

type TFeedDetails = {
  onClose: () => void;
};

export const FeedDetails = ({ onClose }: TFeedDetails) => {
  return (
    <Modal onClose={onClose}>
      <OrderFeed />
    </Modal>
  );
};

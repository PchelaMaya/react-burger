import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BurgersContent } from "../../components/BurgersContent/BurgersContent";

export const Home = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BurgersContent />
      </DndProvider>
    </>
  );
};

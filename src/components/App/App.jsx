import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Header } from "../AppHeaders/Header";
import { BurgersContent } from "../BurgersContent/BurgersContent";

function App() {
  return (
    <>
      <div>
        <Header />
        <DndProvider backend={HTML5Backend}>
          <BurgersContent />
        </DndProvider>
      </div>
    </>
  );
}

export default App;

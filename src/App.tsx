import { useEffect, useState } from "react";
import { Header } from "./components/AppHeaders/Header";
import { BurgersContent } from "./components/BurgersContent/BurgersContent";

function App() {
  const [BurgerIngredients, setBurgerIngredients] = useState();
  const ingredinetsUrl = "https://norma.nomoreparties.space/api/ingredients";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ingredinetsUrl);
        if (!response.ok) {
          throw new Error(`Ошибка загрузки ингредиентов: ${response.status}`);
        }

        const data = await response.json();
        setBurgerIngredients(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {BurgerIngredients && (
        <div>
          <Header />
          <BurgersContent BurgerIngredientsData={BurgerIngredients} />
        </div>
      )}
    </>
  );
}

export default App;

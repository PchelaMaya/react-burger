import { useEffect, useState } from "react";
import { Header } from "../AppHeaders/Header";
import { BurgersContent } from "../BurgersContent/BurgersContent";

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState(null);
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
      {burgerIngredients && (
        <div>
          <Header />
          <BurgersContent burgerIngredientsData={burgerIngredients} />
        </div>
      )}
    </>
  );
}

export default App;

// component import
import IngredientItem from "./IngredientItem";

const Table = ({ ingredients, showRecipe = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showRecipe ? "Recipe" : "", ""].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <IngredientItem ingredient={ingredient} showRecipe={showRecipe} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
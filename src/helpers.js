export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = () => {
  const existingRecipeLength = fetchData("recipes")?.length ?? 0;
  return `${existingRecipeLength * 34} 65% 50%`;
};

// colors
const generateRandomRecipeGroupColor = () => {
  const existingRecipeGroupLength = fetchData("recipegroups")?.length ?? 0;
  return `${existingRecipeGroupLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create recipegroup
export const createRecipeGroup = ({ name, pax, recipegroupdate, recipegrouptime, venue, holdingroom, updatedby }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    pax: +pax,
    recipegroupdate: recipegroupdate,
    recipegrouptime: recipegrouptime,
    venue: venue,
    holdingroom: holdingroom,
    updatedby: updatedby,
    color: generateRandomRecipeGroupColor(),
  };
  const existingRecipeGroups = fetchData("recipegroups") ?? [];
  return localStorage.setItem(
    "recipegroups",
    JSON.stringify([...existingRecipeGroups, newItem])
  );
};

// create recipe
export const createRecipe = ({ name, amount, recipegroupId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    recipegroupId: recipegroupId,
    color: generateRandomColor(),
  };
  const existingRecipes = fetchData("recipes") ?? [];
  return localStorage.setItem(
    "recipes",
    JSON.stringify([...existingRecipes, newItem])
  );
};

// create ingredient
export const createIngredient = ({ name, amount, recipeId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    recipeId: recipeId,
  };
  const existingIngredients = fetchData("ingredients") ?? [];
  return localStorage.setItem(
    "ingredients",
    JSON.stringify([...existingIngredients, newItem])
  );
};

// total spent by recipe
export const calculateSpentByRecipe = (recipeId) => {
  const ingredients = fetchData("ingredients") ?? [];
  const recipeSpent = ingredients.reduce((acc, ingredient) => {
    // check if ingredient.id === recipeId I passed in
    if (ingredient.recipeId !== recipeId) return acc;

    // add the current amount to my total
    return (acc += ingredient.amount);
  }, 0);
  return recipeSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "PHP",
  });
};
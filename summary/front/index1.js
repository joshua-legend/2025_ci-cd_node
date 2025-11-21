const ingredientsTag = document.querySelector("#ingredients");

const getIngredients = async () => {
  const res = await fetch("http://localhost:3000/ingredients");
  const data = await res.json();
  data.forEach((v) => {
    ingredientsTag.insertAdjacentHTML("beforeend", `<option value="${v.name}">${v.name}</option>`);
  });
};
getIngredients();

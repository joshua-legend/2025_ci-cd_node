const name = document.querySelector("#name");
const ingredients = document.querySelector("#ingredients");
const kcal = document.querySelector("#kcal");
const button = document.querySelector("#button");

button.addEventListener("click", async () => {
  const nameValue = name.value;
  const ingValue = ingredients.value.split(",");
  const kcalValue = kcal.value;

  const result = await fetch("http://localhost:3000/pizza", {
    method: "post",
    body: JSON.stringify({ name: nameValue, ingredients: ingValue, kcal: kcalValue }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const msg = await result.json();
  alert(msg);
});

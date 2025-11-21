const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/pizzas", async (req, res) => {
  const pizzas = await prisma.pizza.findMany();
  res.json(pizzas);
});

app.get("/ingredients", async (req, res) => {
  const ingredients = await prisma.ingredients.findMany();
  res.json(ingredients);
});

app.listen(3000, () => {
  console.log("약줘");
});

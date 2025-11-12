const { v4 } = require("uuid");
const ramens = [
  { id: v4(), name: "까르보 불닭볶음면", brand: "삼양", soupType: "볶음면", spicyLevel: 4.5 },
  { id: v4(), name: "남자라면", brand: "팔도", soupType: "국물라면", spicyLevel: 3 },
  { id: v4(), name: "너구리", brand: "농심", soupType: "국물라면", spicyLevel: 3 },
  { id: v4(), name: "참깨라면", brand: "오뚜기", soupType: "국물라면", spicyLevel: 2 },
  { id: v4(), name: "짜파게티", brand: "농심", soupType: "볶음면", spicyLevel: 1 },
];
const reviews = [];

module.exports = { ramens, reviews };

const { v4 } = require("uuid");

const todolist = [
  {
    id: v4(),
    title: "멋지다 여진아",
    description: "최우수상 축하해",
    status: "done",
    dueDate: new Date().toISOString().split("T")[0],
    createdAt: new Date().toLocaleString(),
    updatedAt: "",
  },
  {
    id: v4(),
    title: "반장 파티",
    description: "롯데리아로 가기",
    status: "pending",
    dueDate: new Date().toISOString().split("T")[0],
    createdAt: new Date().toLocaleString(),
    updatedAt: "",
  },
];

module.exports = { todolist };

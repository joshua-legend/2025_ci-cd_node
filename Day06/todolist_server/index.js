const express = require("express");
const app = express();
const { todolist } = require("./data");
const { v4 } = require("uuid");
const Joi = require("joi");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", (req, res) => {
  res.json(todolist);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  res.json(todolist.find((v) => v.id == id));
});

const TodoCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("pending", "in-progress", "done").required(),
  dueDate: Joi.date().required(),
});

const TodoPutSchema = Joi.object({
  title: Joi.string().optional().allow(null),
  description: Joi.string().optional().allow(null),
  status: Joi.string().valid("pending", "in-progress", "done").optional().allow(null),
  dueDate: Joi.date().optional().allow(null),
});

const validateTodoCreateSchema = (req, res, next) => {
  const { error } = TodoCreateSchema.validate(req.body);
  if (error) return res.json({ msg: "ㅗ" });
  next();
};

const validateTodoPutSchema = (req, res, next) => {
  const { error } = TodoPutSchema.validate(req.body);
  if (error) return res.json({ msg: "ㅗ" });
  next();
};

app.post("/todos", validateTodoCreateSchema, (req, res) => {
  const { title, description, status, dueDate } = req.body;
  todolist.push({ id: v4(), title, description, status, dueDate, createdAt: new Date().toLocaleString(), updatedAt: new Date().toLocaleString });
  res.json({ msg: "ㅊㅋ" });
});

app.put("/todos/:id", validateTodoPutSchema, (req, res) => {
  const { id } = req.params;
  const targetIndex = todolist.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.json({ msg: "없음" });
    return;
  }

  const { title, description, status, dueDate } = req.body;

  todolist[targetIndex].title = title || todolist[targetIndex].title;
  todolist[targetIndex].description = description || todolist[targetIndex].description;
  todolist[targetIndex].status = status || todolist[targetIndex].status;
  todolist[targetIndex].dueDate = dueDate || todolist[targetIndex].dueDate;
  todolist[targetIndex].updatedAt = new Date().toLocaleString();
  res.json({ msg: "ㅊㅋ" });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const targetIndex = todolist.findIndex((v) => v.id == id);
  if (targetIndex == -1) {
    res.json({ msg: "없음" });
    return;
  }
  todolist.splice(targetIndex, 1);
  res.json({ msg: "삭제됨 ㅅㄱ" });
});

app.listen(3001, () => {
  console.log("todolist server booting!");
});

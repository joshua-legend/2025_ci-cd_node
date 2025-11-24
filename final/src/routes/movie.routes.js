import express from "express";
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "../controller/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/register", createMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;

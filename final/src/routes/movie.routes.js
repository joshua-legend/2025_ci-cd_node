import express from "express";
import { createMovie, getMovieById, getMovies } from "../controller/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/register", createMovie);

export default router;

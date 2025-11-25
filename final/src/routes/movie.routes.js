import express from "express";
import { getMovies, getMovieById, createMovie, deleteMovie, updateMovie } from "../controller/movie.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie CRUD API
 */

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Get movie list
 *     tags: [Movie]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: searching movie name
 *     responses:
 *       200:
 *         description: Movie list returned
 */
router.get("/", getMovies);

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get movie by id
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single movie
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Create new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Movie created
 *       409:
 *         description: Already exists
 */
router.post("/", createMovie);

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Delete movie
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie deleted
 */
router.delete("/:id", deleteMovie);

/**
 * @swagger
 * /movie/{id}:
 *   patch:
 *     summary: Update movie
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               rating: { type: number }
 *     responses:
 *       200:
 *         description: Movie updated
 */
router.patch("/:id", updateMovie);

export default router;

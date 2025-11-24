import express from "express";
import { createReview, deleteReview, getReviewsById, updateReview } from "../controller/review.controller.js";

const router = express.Router();

router.get("/movie/:movieID", getReviewsById);
router.post("/", createReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;

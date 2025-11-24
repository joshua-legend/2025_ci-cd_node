import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import movieRoutes from "./src/routes/movie.routes.js";
import { responseMiddleware } from "./src/middleware/response.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// 미들웨어
app.use(express.json());
app.use(responseMiddleware);

// 라우터
app.use("/movies", movieRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Express + Prisma + Mysql 기반 커스텀 총정리 서버",
    endpoints: {
      movies: {
        register: "POST /movies/register",
        list: "GET /movies",
        search: "GET /movies?name=제목",
        detail: "GET /movies/:id",
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`API 엔드포인트: http://localhost:${PORT}`);
});

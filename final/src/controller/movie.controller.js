import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getMovies = async (req, res) => {
  const { name } = req.query;
  const movies = await prisma.movies.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  res.json({ movies });
};
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movies.findUnique({
    where: {
      id: +id,
    },
  });
  res.json({ movie });
};

export const createMovie = async (req, res) => {
  const { name, rating } = req.body;
  await prisma.movies.create({
    data: {
      name,
      rating,
    },
  });
  res.json({ msg: `${name}영화가 생성되었습니다.` });
};

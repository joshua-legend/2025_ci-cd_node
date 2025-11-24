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

  res.success(movies);
};
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movies.findUnique({
    where: {
      id: +id,
    },
  });

  if (!movie) res.notFound();

  res.success(movie);
};

export const createMovie = async (req, res) => {
  const { name, rating } = req.body;
  if (!name || !rating) res.validationError(`name 또는 rating 필수로 입력해야 합니다.`);
  if (name.length <= 0 || name.length > 255) res.validationError(`name의 길이는 1 ~ 255자이어야 합니다.`);

  const movie = await prisma.movies.findFirst({ where: { name: name } });
  if (movie) res.conflict(`${name}은 존재합니다.`);
  if (rating < 1 || rating > 5 || isNaN(rating)) res.validationError("rating은 1 ~ 5의 실수로 입력해야 합니다.");

  await prisma.movies.create({
    data: {
      name,
      rating,
    },
  });
  res.success(null, `${name} 영화가 생성되었습니다.`);
};

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
  const { id } = req.params || {};

  if (!id || isNaN(id)) res.validationError("id 데이터가 유효하지 않습니다.");
  const movie = await prisma.movies.findUnique({
    where: {
      id: +id,
    },
  });

  if (!movie) res.notFound();
  res.success(movie);
};

export const createMovie = async (req, res) => {
  const { name, rating } = req.body || {};

  if (!req.body) res.validationError("body가 필요합니다!");
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

export const deleteMovie = async (req, res) => {
  const { id } = req.params || {};
  if (!id || isNaN(id)) res.validationError("id 데이터가 유효하지 않습니다.");

  const target = await prisma.movies.findUnique({ where: { id: +id } });
  if (!target) res.notFound("존재하지 않는 영화입니다.");

  await prisma.movies.delete({ where: { id: +id } });

  res.success(null, `${target.name} 영화가 삭제 되었습니다.`);
};

export const updateMovie = async (req, res) => {
  const { id } = req.params || {};
  const { name, rating } = req.body || {};

  if (!id || isNaN(id)) res.validationError("id 데이터가 유효하지 않습니다.");
  if (name && (name.length <= 0 || name.length > 255)) res.validationError(`name의 길이는 1 ~ 255자이어야 합니다.`);
  if (rating && (rating < 1 || rating > 5 || isNaN(rating))) res.validationError("rating은 1 ~ 5의 실수로 입력해야 합니다.");

  const target = await prisma.movies.findUnique({ where: { id: +id } });
  if (!target) res.notFound("해당 영화는 존재하지 않습니다.");

  await prisma.movies.update({
    where: { id: +id },
    data: {
      name: name || target.name,
      rating: rating || target.rating,
    },
  });
  res.success(null, `${target.name} 영화가  되었습니다.`);
};

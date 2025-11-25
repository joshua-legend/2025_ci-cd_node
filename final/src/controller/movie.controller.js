import { MovieRepository } from "../repository/movie.repository.js";

export const getMovies = async (req, res) => {
  const { name } = req.query;
  const movies = await MovieRepository.findAll(name);
  res.success(movies);
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await MovieRepository.findByID(id);
  if (!movie) res.notFound();
  res.success(movie);
};

export const createMovie = async (req, res) => {
  const { name, rating } = req.body;
  const movie = await MovieRepository.findByName(name);
  if (movie) res.conflict(`${name}은 존재합니다.`);
  await MovieRepository.create(name, rating);
  res.success(null, `${name} 영화가 생성되었습니다.`);
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const target = await MovieRepository.findByID(id);
  if (!target) res.notFound("존재하지 않는 영화입니다.");
  await MovieRepository.delete(id);
  res.success(null, `${target.name} 영화가 삭제 되었습니다.`);
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  const target = await MovieRepository.findByID(id);
  if (!target) res.notFound("해당 영화는 존재하지 않습니다.");
  await MovieRepository.update(name, rating);
  res.success(null, `${target.name} 영화가 되었습니다.`);
};

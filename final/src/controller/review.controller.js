import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createReview = async (req, res) => {
  const { contents, movieID } = req.body || {};

  if (!req.body) res.validationError("body 데이터를 입력해 주세요.");
  if (!contents || !movieID) res.validationError("contents와 movieID 데이터를 입력해 주세요.");
  if (+movieID < 0 || isNaN(movieID)) res.validationError("ID 입력값이 양의 정수이어야 합니다.");

  const target = await prisma.movies.findFirst({ where: { id: +movieID } });
  if (!target) res.notFound("해당 영화는 존재하지 않습니다.");

  await prisma.reviews.create({
    data: {
      contents,
      movie_id: movieID,
    },
  });
  res.success("댓글이 등록 되었습니다.");
};

// "??:작전타임~ ☃️:인정한다."
export const getReviewsById = async (req, res) => {
  const { movieID } = req.params || {};
  if (!movieID || isNaN(movieID)) res.validationError("id가 유효하지 않습니다.");
  const reviews = await prisma.reviews.findMany({ where: { movie_id: +movieID } });
  res.success(reviews);
};
export const deleteReview = async (req, res) => {
  const { id } = req.params || {};
  if (!id || isNaN(id)) res.validationError("id가 유효하지 않습니다.");
  const target = await prisma.reviews.findUnique({ where: { id: +id } });
  if (!target) res.notFound("해당 댓글은 존재하지 않습니다.");
  await prisma.reviews.delete({ where: { id: +id } });
  res.success("해당 댓글은 삭제되었습니다.");
};
export const updateReview = async (req, res) => {
  const { id } = req.params || {};
  const { contents } = req.body || {};

  if (!id || isNaN(id)) res.validationError("id가 유효하지 않습니다.");
  if (!req.body) res.validationError("body가 존재하지 않습니다.");
  if (!contents) res.validationError("contents가 존재하지 않습니다.");
  if (contents.trim().length == 0) res.validationError("cotents는 최소 한글자 있어야 합니다.(공백제거)");

  const review = await prisma.reviews.findUnique({ where: { id: +id } });
  if (!review) res.notFound("해당 댓글은 존재하지 않습니다.");
  await prisma.reviews.update({ where: { id: +id }, data: { contents } });
  res.success("댓글이 수정되었습니다.");
};

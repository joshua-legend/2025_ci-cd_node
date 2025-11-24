export const responseMiddleware = (req, res, next) => {
  // 성공
  res.success = (data = null, message = "요청이 성공적으로 처리되었습니다.", statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data, message });
  };
  // 에러

  next();
};

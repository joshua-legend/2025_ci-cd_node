export const responseMiddleware = (req, res, next) => {
  // 성공[GET(조회),POST(생성)]
  res.success = (data = null, message = "요청이 성공적으로 처리되었습니다.", statusCode = 200) => {
    const response = {
      success: true,
      message,
    };

    if (data != null) response.data = data;

    return res.status(statusCode).json(response);
  };
  // 에러[조회에러(없음),생성에러(중복, 유효성검증)]
  res.error = (message = "요청 처리 중 오류가 발생했습니다.", statusCode = 400) => {
    const response = {
      success: false,
      message,
    };
    return res.status(statusCode).json(response);
  };

  // 리소스 없음 응답 (404 Not Found)
  res.notFound = (message = "요청한 리소스를 찾을 수 없습니다.") => {
    return res.error(message, 404);
  };

  // 리소스 중복 응답 (409 Conflict)
  res.conflict = (message = "리소스 충돌이 발생했습니다.") => {
    return res.error(message, 409);
  };

  // 유효성 검증 실패 (422 Unprocessable)
  res.validationError = (message = "입력 데이터가 유효하지 않습니다.") => {
    return res.error(message, 422);
  };

  next();
};

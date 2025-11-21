const express = require("express");
const app = express();

// 웹 브라우저(주인님)
// Request <-> Response [HTTPS 방식]
// 웹 서버(따까리)는 CRUD[생성(POST), 조회(GET), 수정(PUT), 삭제(DELETE)]
app.get("/caffeins", (req, res) => {
  res.json(["아메리카노", "라떼", "카페모카"]);
});

app.get("/breads", (req, res) => {
  res.json(["식빵", "단팥빵", "소금빵"]);
});

app.listen(3000, () => {
  console.log("서버 시작!");
});

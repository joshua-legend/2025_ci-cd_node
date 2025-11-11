const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end("서버 연결 완성!✅");
});

server.listen(3000, () => {
  console.log("실행중~");
});

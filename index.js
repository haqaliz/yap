const http = require('http');
const url = require('url');

const DEV = process.env.NODE_ENV === 'development';

const app = http.createServer((req, res) => {
  const host = url.parse(req.headers.host, true);
  const path = url.parse(req.url, true);
  console.log(host, path)
  res.end("Hello world!!")
})

if (DEV) {
  const PORT = 8082;
  app.listen(PORT, () => {
    console.log(`Mosh is listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}

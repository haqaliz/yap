const app = require('express')();
const bodyParser = require('body-parser');
const routers = require('./src/routers');

const DEV = process.env.NODE_ENV === 'development';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', routers);

if (DEV) {
  const PORT = 8082;
  app.listen(PORT, () => {
    console.log(`Mosh is listening on port ${PORT}`);
  });
} else {
  module.exports = app;
}

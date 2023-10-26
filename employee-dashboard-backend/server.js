const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const api = require('./api');
const models = require('./models/index');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

models.init();

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
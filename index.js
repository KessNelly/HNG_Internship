const express = require("express");
const app = express();
const dotenv = require ("dotenv").config();
const axios = require("axios");
const port = process.env.PORT || 5016;
const apiRouter = require("./route/webRoute");

app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
});

module.exports = app;
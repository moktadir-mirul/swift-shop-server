require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Swift Shop Database is Here!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

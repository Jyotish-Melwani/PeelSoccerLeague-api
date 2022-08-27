const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = require('./config/keys')
var cors = require('cors')
const path = require('path');
const PORT = process.env.PORT || 5000

app.use(express.static(path.resolve('./')));

app.use(cors())
app.use(express.json())
app.use("/api", require('./routes/game'))
app.use("/api", require('./routes/user'))
app.use("/api", require('./routes/team'))

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(PORT, ()=> console.log(`Running up that hill on port ${PORT}`));
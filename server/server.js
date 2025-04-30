const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDb = require('./Config/db.config');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
connectDb();

// Routes



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


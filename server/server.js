const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const auth = require("./routes/auth")


app.use(bodyParser.json());
app.use(cors())

const mongoUri = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;
mongoose.connect(mongoUri)
  .then(() => {
    console.log(`✅ Connected to MongoDB: ${process.env.DB_NAME}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });


// Routes
app.post('/auth', auth);



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


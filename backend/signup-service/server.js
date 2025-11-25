const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sher_khan_signup';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Signup service: MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.json({ message: 'Signup service running' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Signup service listening on ${PORT}`));

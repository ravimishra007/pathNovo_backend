require('dotenv').config();
const mongoose = require('mongoose');

async function connectionToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
      console.log('Connected to MongoDB');  
    } catch (error) {
    console.error('Database connection error:', error);
    // Re-throw the error to be caught in the calling function
    throw error;
  }
}

module.exports = { connectionToDb };

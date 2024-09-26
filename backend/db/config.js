const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("db connected");
} catch (error) {
    console.log("Error occured " + error)    
}
const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User'); 

const app = express();
app.use(express.json());
app.use(cors());

console.log("Working");
app.listen(5000);
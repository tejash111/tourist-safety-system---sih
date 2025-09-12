const mongoose = require('mongoose')
require('dotenv').config();

mongoose.
connect(process.env.MONGO_DB)
.then(()=>console.log('db connected'))
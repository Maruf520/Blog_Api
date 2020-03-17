

const express = require('express');
const app = express();
const router = require('express').Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/Auth');
const postRoutes = require('./routes/post');


//connect to database
mongoose.connect(process.env.DB_CONNECT,{useNewUrlPar:  true},() => console.log('Db Connected!'));


app.use(express.json());

app.use('/api/user',authRoutes)

app.use('/api/user',postRoutes);

app.listen(4000, () => console.log('server up and runnig'));
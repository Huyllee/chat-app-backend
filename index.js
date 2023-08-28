import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config();

import posts from './routers/posts'

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.URI;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());

app.use('/posts', posts);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connecting to DB');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}).catch(err => {
    console.log('err from mongoose', err);
});


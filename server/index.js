import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('Hello to Anecdotes API');
})

// https://www.mongodb.com/cloud/atlas

const CONNECTION_URL= process.env.CONNECTION_URL;
console.log(CONNECTION_URL, '[connection url]');
const PORT = process.env.PORT || 7000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true , useUnifiedTopology : true})
    .then( ()=>app.listen(PORT, ()=> console.log(`SERVER RUNNING ON PORT : ${PORT}`)))
    .catch( (error)=> console.log(error));

// mongoose.set('useFindAndModify', false);
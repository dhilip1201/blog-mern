const express =require('express');
const env = require('dotenv');
const mongoose = require('mongoose')
const app= express();
const cors =require('cors')
const authRoutes = require('./routes/auth');
const adminRoutes= require('./routes/admin/auth')
const blogRoutes= require('./routes/blog')
const commentRoutes= require('./routes/comment')
const initalDataRoutes = require('./routes/admin/initialData');

env.config();

const connectionUrl=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ksq2k.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`


mongoose.connect(connectionUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB Connected')
});

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', blogRoutes);
app.use('/api', initalDataRoutes);
app.use('/api', commentRoutes);




app.listen(process.env.PORT,()=>{
    console.log(`Running Our Port is ${process.env.PORT}`)
})
require('dotenv').config()//env file data 
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const mongoURI=require('./config/dev.js')
const userRoutes=require('./routers/User')
const commentRoutes=require('./routers/Comment')
const cookieParser = require('cookie-parser')
const app =express()

const connect = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000
//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//api routes
app.use('/api',userRoutes);
app.use('/api',commentRoutes);

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});

  
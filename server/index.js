const express = require('express');
const app = express();
const db = require('./database/connection');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const cors = require('cors')
require('dotenv').config()

db.connect()

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/', (req, res)=>{
    res.send('hello')
})



app.listen(PORT, ()=>{
    console.log(`server listening on PORT ${PORT}`)
})
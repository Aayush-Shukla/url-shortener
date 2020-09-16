const express=require('express')
const app= express()
var path = require('path');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
var jsonParser = bodyParser.json()
mongoose.connect('mongodb://localhost:27017/UrlDB', { useNewUrlParser: true })
const db=mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log("DB connected"))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const indexRoute=require('./routes/index')
app.use('/',indexRoute)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,()=>console.log("server started at 3000"))
const express= require("express")
const bodyParser=require('body-parser')
var jsonParser = bodyParser.json()
const router=express.Router()
const Url=require('../models/urls')
const { response } = require("express")


router.post('/shorten',async function (req,res,next){
    console.log(req.params.url,generateRandomString())
    console.log(Url.find().or([{ "url":req.params.url }]))


    const url= new Url({
        url:req.body.url,
        shortUrl:generateRandomString()
    })
    try{
        const tempurl=await url.save()
        res.status(201).json(tempurl)

    }catch(err){
        res.status(400).json({message:err.message})

    }

})

router.get('/:shortUrl', function (req,res,next){

    var short=req.params.shortUrl
    // console.log(req.params.key,new RegExp('/'+key+'/', "i"))

    let list

    Url.findOne().or([{"shortUrl": short}]).then(result=>{
        res.redirect(result.url)
        res.json(result)

    }).catch(err=>{
        res.status(400).json({message:err.message})})





})


router.get('/',function (req,res,next) {

    res.render("generator")

})




generateRandomString = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const id = []
    let counter = 0
    while (counter < 6) {
        id.push(charset[Math.floor(Math.random() * charset.length)])
        counter++
    }
    return id.join('')
}


module.exports=router
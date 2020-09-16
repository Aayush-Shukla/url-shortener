const express= require("express")
const bodyParser=require('body-parser')
var jsonParser = bodyParser.json()
const router=express.Router()
const Url=require('../models/urls')
const { response } = require("express")


router.get('/:url',async (req,res)=>{
    console.log(req.params.url,generateRandomString())
    const url= new Url({
        url:req.params.url,
        shortUrl:generateRandomString()
    })
    try{
        const newstudent=await url.save()
        res.status(201).json(newstudent)

    }catch(err){
        res.status(400).json({message:err.message})

    }

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
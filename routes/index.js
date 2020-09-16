const express= require("express")
const bodyParser=require('body-parser')

const router=express.Router()
const Url=require('../models/urls')



router.post('/shorten',async function (req,res,next){
    // console.log(req.params.url,generateRandomString(),req.get('host'))

    var shortened=generateRandomString()

    const url= new Url({
        url:req.body.url,
        shortUrl:shortened
    })
    try{
        const tempurl=await url.save()


    }catch(err){
        console.log({message:err.message})

    }
    res.render('short',{data:{shortUrl:shortened,hostUrl:req.get('host')}})

})

router.get('/:shortUrl', function (req,res,next){

    var short=req.params.shortUrl




    Url.findOne().or([{"shortUrl": short}]).then(result=>{
        res.redirect(result.url)


    }).catch(err=>{
        res.render('short',{error: "Looks like you're lost"})})





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
const express=require('express');
const bodyParser = require('body-parser');
const fs=require('fs');
const ImageUpload=require('../models/uploadImg');
const fileUpload=require('express-fileupload');
const { render } = require('ejs');

//for router
const router=express.Router();
router.use(fileUpload());

const encoder=bodyParser.urlencoded({extended:false});

//for home page
router.get('/',async (req,res) => {
    await res.render('home')
})

router.post('/',encoder,async (req,res) => {
    const error_array=[];
    const {unm,dis,img_path}=req.body;
    const img=req.files.img_path;
    const mb=img.size/1024/1024;
    if(mb > 1){
        error_array.push({error:'Image Size Greater 1MB'});
    }
    if(!img.name.match(/\.(jpeg|png|jpg)$/)){
         error_array.push({error:'Only Allow Image Type'});
    }
    if(error_array.length > 0){
        res.render('home',{error_array,unm,dis});
    }
    else{
        //image move
        img.mv('./uploaded-image/'+img.name);
        const imgPath='uploaded-image/'+img.name;

        //store in MongoDB
        const ImgUp=new ImageUpload({uploaderName:unm,imageDis:dis,imagePath:imgPath});
        try{
            await ImgUp.save();
            res.render('home');
        }catch(err){
            res.status(500).send('server Error')
        }
    }
})

router.get('/see_images',async (req,res) => {
    const FindAllImages=await ImageUpload.find({});
    try{
        res.render('see_images',{FindAllImages});
    }catch(err){
        res.status(500).send('server Error')
    }
})

router.get('/del_images',async (req,res) => {
    const FindAllImages=await ImageUpload.find({});
    try{
        res.render('del_images',{FindAllImages});
    }catch(err){
        res.status(500).send('server Error')
    }
})

router.get('/del_images/:id',async (req,res) => {
    const _id=req.params.id;
    const FindAllImages=await ImageUpload.find({});
    const findper=await ImageUpload.find({_id});
    for(let val in findper){
        var imgpaths=findper[val].imagePath;
    }
    try{
        const delimg=await ImageUpload.findByIdAndDelete(_id);
         fs.unlink(imgpaths,function(err) {
            if (err) throw err;
        });
        await res.redirect('back');
    }catch(err){
        res.status(500).send('Server Error');
    }
})

module.exports=router;
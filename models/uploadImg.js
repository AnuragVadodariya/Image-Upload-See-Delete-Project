const mongoose=require('mongoose');

const ImgSchema=mongoose.Schema({
    uploaderName:{
        type:String,
        required:true,
        trim:true
    },
    imageDis:{
        type:String,
        required:true,
        trim:true
    },
    imagePath:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default: Date.now
    }
});

const ImageUpload=mongoose.model('upload-pic',ImgSchema);

module.exports=ImageUpload;


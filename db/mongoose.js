const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/img-Upload',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
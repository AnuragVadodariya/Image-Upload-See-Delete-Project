const express=require('express');
const app=new express();
require('./db/mongoose');
const UploadRouter=require('./routers/upload');
const port=process.env.PORT || 8080;

app.use(express.json());

//for Ejs
app.set('view engine','ejs');

//for Add Stylesheet (public/css/style.css)
app.use('/public',express.static(__dirname+'/public'));
app.use('/uploaded-image',express.static(__dirname+"/uploaded-image"));

//for router
app.use(UploadRouter);

app.listen(port,() => console.log(`server up on port ${port}`));
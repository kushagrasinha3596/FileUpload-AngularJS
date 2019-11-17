const express = require('express')
const multer = require('multer')
const fs = require('fs')
const app = express()

  const dir = './uploadedFiles';
  const storage = multer.diskStorage({
    destination: function(req, file, cb){
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
      cb(null, 'uploadedFiles/');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
  })

  let fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null, false); //generates error, because 'false' is passed in callback function
    }else{
      cb(null, true);  //not generates error, because 'true' is passed in callback function
    }
  }

  let multerConf = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
     },
     fileFilter: fileFilter
  });

  //let multerConf = multer({dest: 'files/'});

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post('/ping', multerConf.single("textFile"), function (req, res) {
  console.log(req.file);
  console.log("Request Recieved");
  console.log(req.body);
  res.send(req.body)
})

app.listen(3000, function () {
    console.log("Hello");
  console.log('Nodejs app listening on port 3000')
})
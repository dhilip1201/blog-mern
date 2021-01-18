const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3= require('multer-s3');
const aws =require('aws-sdk')
const shortid = require('shortid');

exports.requireSignIn =(req,res,next)=>{
    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    }
    else{
        return res.status(400).json({message: 'Authorization Required'})
    }
    next();
}

exports.userMiddleware = (req,res,next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message: 'Admin Access Denied'
        })
    }
    next();
}

exports.adminMiddleware = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message: 'Admin Access Denied'
        })
    }
    next();
}

const s3 = new aws.S3({ 
    accessKeyId: 'AKIAJ6XWYVKZTXNLPI6A',
    secretAccessKey: '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'
});

exports.uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'blog-buckets',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
})


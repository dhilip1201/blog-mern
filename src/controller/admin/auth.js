const User = require("../../models/user")
const jwt = require('jsonwebtoken');
const shortid = require('shortid')

exports.adminSignUp = (req,res) =>{
 User.findOne({email: req.body.email}).exec((error, user)=>{
     
    if(user) return res.status(400).json({
        message: 'This email already Registred'
    })
    const {
        firstName,lastName,email,password
    } = req.body;

    const _user = new User({ 
        firstName,
        lastName,
        email,
        role:"admin",
        password,
        username:shortid.generate()
    })
    _user.save((error, data) =>{
        if(error) return res.status(400).json({
            message: error
        })
        if(data){
            res.status(201).json({
                message:'Admin Create Successfully'
            })
        }
    })
    

 })
}

exports.adminSignIn =(req,res)=>{
    User.findOne({email:req.body.email}).exec((error, user)=>{
        
        if(error) return res.status(400).json({error});
        if(user){
            // console.log("USER>>>",user)
            
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                
                const token = jwt.sign({_id:user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:'365d'})
                const {_id,firstName, lastName, email, role, fullName} = user;
                res.cookie("token",token, {expiresIn:'365d'});
                res.status(201).json({
                    token,
                    user:{
                        _id,
                        firstName,
                        lastName, 
                        email, 
                        role, 
                        fullName
                    },
                    
                })
            }
            else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        }else{
            return res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
}

exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Signout Successfully'
    })
}
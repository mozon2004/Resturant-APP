const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const registerController = async(req,res)=>{
    try{
        const {username,email,password,phone,address,answer} = req.body;
        //validate
        if(!username || !email || !password || !phone || !address || !answer){
            res.status(500).send({
                 success:false,
                 message:'Please provide all fields'
            })
        }
        // check user عشان اعرف اذا كاين مسجل او لاء
        const exisiting = await User.findOne({email});
        if(exisiting){
            return res.status(500).send({
                success:false,
                message:'Email Already Registerd Please Login'
            })
        }
        //password hashing
        const salt = bcrypt.genSaltSync(10);//مقدار التشفير 
        const hassedPassword = await bcrypt.hash(password,salt);
     
        // create new user
        const user = await User.create({
            username,
            email,
            password: hassedPassword,//بتاخد قيمته المشفرة
            address,
            phone,
            answer
        });
        res.status(201).send({
            success:true,
            message:'Successfully Registered',
            user
        })

    }catch(error){
         console.log(error);
         res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
         })
    }
};


const loginController =async(req,res)=>{
    try{
       const {email,password} =req.body;
       //validate
       if(!email || !password){
        return res.status(500).send({
            success:false,
            message:'Please Provide Email All Password'
        })
       }
       //check user
       const user = await User.findOne({email:email})
       if(!user){
         return res.status(404).send({
            success:false,
            message:'User Not Found '
         })
       }
       //check user password عشان فك التشفير 
       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
        //اذا مش متطابقة
        return res.status(500).send({
            success:false,
            message:'invalid password'
        });
       }
        //Token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

       user.password = undefined;
       res.status(200).send({
        success:true,
        message:'Login Successfully',
        token,
        user
       })


    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
    }
}

module.exports = {registerController,loginController}
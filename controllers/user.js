const User = require('../models/User');
const bcrypt = require('bcryptjs')

const getUserController = async(req,res)=>{
   try {
      //find user by id
      const user = await User.findById({_id:req.user.id});//hide id  ,{_id:0}
      //validation
      if(!user){
        return res.status(404).send({
            success:false,
            message:'User Not Found'
         })
      }
      //hide password
      user.password= undefined;
      res.status(200).send({
         success:true,
         message:'user get successfully',
         user
      })

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In  Get User API',
         error
      })
      
   }
};

const updateUser = async(req,res)=>{
   try {
      //find user
      const user = await User.findById({_id:req.user.id});
      if(!user){
         return res.status(404).send({
            success:false,
            message:'User Not Found'
         })
      }
      //update 
      const {username,address,phone,}= req.body;//لازم زي ترتيب السكيما
      if(username) user.username = username;
      if(address) user.address = address;
      if(phone)   user.phone = phone;

      //save user
      await user.save();

      res.status(200).send({
         success:true,
         message:'User Updated Successfully',
         user
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Update User API ',
         error
      })
   }

};

const resetPassword = async(req,res)=>{
   try {
      const {email,newPassword, answer} =req.body;
      if(!email || !newPassword || !answer){
         return res.status(500).send({
            success:false,
            message:'Please Provide All Feilds'
         })
      }
      const user = await User.findOne({email,answer});
      if(!user){
         return res.status(500).send({
            success:false,
            message:'user not found or invalid answer'
         })
      }
       //password hashing
      const salt = bcrypt.genSaltSync(10);//مقدار التشفير 
      const hassedPassword = await bcrypt.hash(newPassword,salt);
      user.password = hassedPassword;

      await user.save();
      res.status(200).send({
         success:true,
         message:'Password Reset Successfully'
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Reset Password API',
         error
      })
      
   }
};

const updatePassword = async(req,res)=>{
   try {
      const user = await User.findOne({_id:req.user.id});
      if(!user){
         return res.status(404).send({
            success:false,
            message:'User Not Found'
         })
      }
      //get user data
      const {oldPassword,newPassword}= req.body;
      if( !oldPassword || !newPassword){
         return res.status(500).send({
            success:false,
            message:'Please Provide Old Or New Password'
         })
      }
     //check user password عشان فك التشفير 
       const isMatch = await bcrypt.compare(oldPassword,user.password);
       if(!isMatch){
       //اذا مش متطابقة
         return res.status(500).send({
            success:false,
            message:'invalid old password'
          });
      }
        //password hashing
      const salt = bcrypt.genSaltSync(10);//مقدار التشفير 
      const hassedPassword = await bcrypt.hash(newPassword,salt);
      user.password = hassedPassword;

      await user.save();

      res.status(200).send({
         success:true,
         message:'Password Updated Successfully'
      })
   } catch (error) {
       console.log(error);
       res.status(500).send({
         success:false,
         message:'Error in password update API',
         error
      })
   }
};

const deleteUser = async(req,res)=>{
   try {
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).send({
         success:true,
         message:'User Deleted Successfully'
      })
      
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Delete User API',
         error
      })
   }
}

module.exports = {getUserController,updateUser,resetPassword,updatePassword,deleteUser};
const mongoose = require('mongoose');
//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'clinet',
        enum:['admin','clinet','vendor','driver']  //بتكون قيمته وحدة من هدول
    },
    profile:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'
    },
    answer:{//بنحط فيه معلومات تقنية او اشياء مفضلة وهيك
        type:String,
        required:[true,'Answer is required']
    }
},{timestamps:true})//عشان لو بدي اعمل تصفية او اشي

module.exports= mongoose.model('User',userSchema);
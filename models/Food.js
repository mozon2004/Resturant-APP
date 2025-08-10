const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
   title:{
      type:String,
      required:[true,'Food Title Is Require']
   },
   description:{
      type:String,
      required:[true,'food description is require']
   },
   price:{
      type:Number,
      required:[true,'food price is require']
   },
   imageUrl:{
      type:String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fgraphicsfamily.com%2Fdownloads%2Feditable-photoshop-food-logo-design%2F&psig=AOvVaw046y7dUQLhxZPyY_0LuS2G&ust=1753627304255000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjovO_u2o4DFQAAAAAdAAAAABAE"
   },
   foodTags:{
    type:String
   },
   category:{
    type:String
   },
   code:{
    type:String
   },
   isAvalible:{
    type:Boolean,
    default:true
   },
   restaurant:{
    type:mongoose.Schema.Types.ObjectId,//عشان العلاقة بينهم
    ref:'Restaurant'//لازم يكون نفس اسمه بالمودل
   },
   rating:{
    type:Number,
    default:5,
    min:1,
    max:5
   },
   ratingCount:{
    type:String
   }


},{timestamps:true});

module.exports = mongoose.model('Foods',foodSchema);
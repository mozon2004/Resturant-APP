const Food = require('../models/Food');
const Order = require('../models/order');

const createFood = async(req,res)=>{
   try {
     const foodData = req.body;
     if(!foodData){
        return res.status(500).send({
            success:false,
            message:'please Provide All Fields',
        })
     }
     const food = new Food(foodData);
     await food.save();
     res.status(201).send({
        success:true,
        message:'Food Created Successfully',
        food
     })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In Create Food API',
        error
    })
   }
};

const getAllFoods = async(req,res)=>{
    try {
      const foods = await Food.find({});
      if(!foods){
         return res.status(404).send({
            success:false,
            message:'No Foods Found',
            error
         })
      }
      res.status(200).send({
         success:true,
         message:'Get All Foods Successfully',
         totalCountFoods:foods.length,
         foods
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Get All Food API',
         error
      })
    }
};

const getById = async(req,res)=>{
   try {
      const foodId = req.params.id;
      if(!foodId){
         return res.status(404).send({
            success:false,
            message:'Please Provide Id',
            
         })
      }
      const foodData = await Food.findById(foodId);
      if(!foodData){
         return res.status(404).send({
            success:false,
            message:'No Found Food With This Id ',
         })
      }
      res.status(200).send({
         success:true,
         message:'Get Food By Id Successfully',
         foodData
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Get Food By ID API',
         error
      })
   }
};

const getByRestaurant = async(req,res)=>{
   try {
      const restaurantId = req.params.id;
      if(!restaurantId){
         return res.status(404).send({
            success:false,
            message:'Not Found Restaurant Id'
         })
      }
      const foodByRestaurant = await Food.find({restaurant:restaurantId});
      if(!foodByRestaurant){
          return res.status(404).send({
            success:false,
            message:'Not Found Food With This Restaurant Id'
         })
      }
      res.status(200).send({
         success:true,
         message:'Food By Restaurant Id Successfully',
         foodByRestaurant
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Get By Restaurant API',
         error
      })
   }
};

const updateFood = async(req,res)=>{
   try {
      const foodId = req.params.id;
      if(!foodId){
         return res.status(404).send({
            success:false,
            message:'no food id was found'
         })
      }
      //أول سطر بيجيب نسخة من الوثيقة ويخزنها في food.
      
      const food = await Food.findById(foodId);
      if(!food){
         return res.status(404).send({
            success:false,
            message:'No Food Found'
         })
      }
      const foodData = req.body;
             //       ثاني سطر بيحذف الوثيقة.

      const foodUpdated = await Food.findByIdAndUpdate(foodId,foodData,{new:true});
      res.status(200).send({
         success:true,
         message:'Food Updated Successfully',
         foodUpdated
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Update Food API',
         error
      })
   }
};

const deleteFood = async(req,res)=>{
   try {
      const foodId = req.params.id;
      if(!foodId){
         return res.status(404).send({
            success:false,
            message:'Not Found Food Id'
         })
      }
      //food راح يحتوي على الوثيقة قبل الحذف (إن وجدت).
      //  لو ما لقى إشي، food راح يكون null.
      //هاي لو م بدي انفذ عمليات ثانية ع الfood
      const food = await Food.findByIdAndDelete(foodId);
      if(!food){
          return res.status(404).send({
            success:false,
            message:'Not Found Food Was Id'
         })
      }
      res.status(200).send({
         success:true,
         message:'Food Deleted Successfully'
      })
      } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Delete Food API',
         error
      })
   }
};

const orderFood = async(req,res)=>{
   try {
      const {cart } = req.body;
      if(!cart){
         return res.status(500).send({
            success:false,
            message:'Please Provide Cart Or Payment'
         })
      }

      let total = 0;
      cart.map((i)=>{
         total += i.price;
      })

      const order = new Order({
         foods:cart,
         payment:total,
         buyer:req.user.id
      });
      await order.save();

      res.status(200).send({
         success:true,
         message:'Food Ordered Successfully',
         order
      })

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Order Food Api',
         error
      })
   }
};

const orderStatus = async(req,res)=>{
   try {
      const orderId = req.params.id;
      if(!orderId){
         return res.status(404).send({
            success:false,
            message:'Please Provide Order ID'
         })
      }
      const {status} = req.body;
      const order = await Order.findByIdAndUpdate(orderId,{status},{new:true});
      res.status(200).send({
         success:true,
         message:'Order Status Updated'
      })

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error In Order Status API',
         error
      })
   }
}


module.exports = {createFood,getAllFoods,getById,getByRestaurant,updateFood,deleteFood,orderFood,orderStatus};
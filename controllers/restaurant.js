const Restaurant = require('../models/Restaurant');

const createRestaurant = async(req,res)=>{
    try {
        const restaurantData =req.body;
        if(!restaurantData || Object.keys(restaurantData).length === 0){
           return res.status(500).send({
                success:false,
                message:'Please Provide All Fields',
                error
            })
        }
        const newRestaurant = new Restaurant(restaurantData);
        await newRestaurant.save();

        res.status(201).send({
            success:true,
            message:'Restaurant Created Successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            cuccess:false,
            message:'Error In Create Restaurant API',
            error
        })
    }
};

const getAllRestaurants = async(req,res)=>{
    try {
        const restaurants = await Restaurant.find({});
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:'NO Resturant Avalible',
                error
            })
        }
        res.status(200).send({
            success:true,
            message:'Get All Restaurants Successfully',
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get All Restaurants API',
            error
        })
    }
};

const getRestaurantById = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
           return res.status(404).send({
            success:false,
            message:'Please Provide Restaurant ID'
           })
        }
        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:'No Restaurant With this ID',
                error
            })
        }
        res.status(200).send({
            success:true,
            message:'Get Restaurant By ID Successfully',
            restaurant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Get Restaurant By ID API',
            error
        })
    }
};

const deleteRestaurant = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Restaurant ID',
                error
            })
        }
        await Restaurant.findByIdAndDelete(restaurantId);
      
        res.status(200).send({
            success:true,
            message:'Restaurant Deleted Successfully'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Delete Restaurant API',
            error
        })
    }
}

module.exports ={createRestaurant,getAllRestaurants,getRestaurantById,deleteRestaurant}
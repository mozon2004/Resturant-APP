const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')
const {createFood,getAllFoods,getById,getByRestaurant,updateFood,deleteFood,orderFood,orderStatus} = require('../controllers/food')

const router = express.Router();

router.post('/create',auth,createFood)
      .get('/getAll',getAllFoods)
      .get('/get/:id',auth,getById)
      .get('/getByRestaurant/:id',getByRestaurant)
      .put('/update/:id',auth,updateFood)
      .delete('/delete/:id',auth,deleteFood)
      .post('/placeorder',auth,orderFood)
      .post('/orderstatus/:id',auth,admin,orderStatus)

module.exports=router;
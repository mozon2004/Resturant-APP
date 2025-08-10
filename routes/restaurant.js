const express = require('express');
const auth = require('../middlewares/auth');
const {createRestaurant,getAllRestaurants,getRestaurantById,deleteRestaurant} = require('../controllers/restaurant')

const router = express.Router();

//routes
router.post('/create',auth,createRestaurant)
      .get('/getAll',getAllRestaurants)
      .get('/getById/:id',getRestaurantById)
      .delete('/delete/:id',auth,deleteRestaurant)


module.exports = router;

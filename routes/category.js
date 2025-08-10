const express = require('express');
const auth = require('../middlewares/auth');
const {createCategory,getAllCategory,updateCategory,deleteCategory} =require('../controllers/category');

const router = express.Router();

router.post('/create',auth,createCategory)
      .get('/getAll',getAllCategory)
      .put('/update/:id',auth,updateCategory)
      .delete('/delete/:id',auth,deleteCategory)

module.exports= router;
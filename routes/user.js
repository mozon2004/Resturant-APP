const express = require('express');
const { getUserController,updateUser ,resetPassword ,updatePassword,deleteUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/getUser',auth,getUserController)
      .put('/update',auth,updateUser)
      .post('/resetPassword',auth,resetPassword)
      .post('/updatePassword',auth,updatePassword)
      .delete('/deleteUser/:id',auth,deleteUser)


module.exports= router;
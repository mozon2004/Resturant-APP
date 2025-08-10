const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
 {
    foods:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Foods'
    }],
    payment:{ },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type: String,
        enum:['on the way','preparing','prepare','deliverd'],
        default:'preparing'
    }

  }
,{timestamps:true});

module.exports = mongoose.model('Orders',orderSchema);
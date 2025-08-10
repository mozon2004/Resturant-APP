const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required']
    },
    imgeUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fgraphicsfamily.com%2Fdownloads%2Feditable-photoshop-food-logo-design%2F&psig=AOvVaw046y7dUQLhxZPyY_0LuS2G&ust=1753627304255000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjovO_u2o4DFQAAAAAdAAAAABAE"
    },
    

},{timestamps:true});

module.exports = mongoose.model('Category',categorySchema);

const Category = require('../models/Category');

const createCategory = async(req,res)=>{
  try {
    const {title,imageUrl} =req.body;
    if(!title){
        return res.status(500).send({
            success:false,
            message:'Please Provide All Fields',
        })
    }
    const category = new Category({title,imageUrl});
    await category.save();
    res.status(201).send({
        success:true,
        message:'Category Created Successfully',
        category
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In Create Category API',
        error
    })
  }
};

const getAllCategory = async(req,res)=>{
  try {
    const categores = await Category.find({});
    if(!categores){
      return res.status(404).send({
        success:false,
        message:'No Categores Found',
      })
    }
    res.status(200).send({
      success:true,
      message:'Get All Categores Successfully ',
      totalCountCat: categores.length,
      categores
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error In Get All Successfully',
      error
    })
  }
};

const updateCategory = async(req,res)=>{
  try {
    const categoryId = req.params.id;
    const {title,imageUrl}=req.body;

    const updatedCategory = await Category.findByIdAndUpdate(categoryId,{title,imageUrl},{new:true});
    //معناها انه الجديد هو الصح عشان يتم التحديث
    if(!updatedCategory){
      return res.status(500).send({
        success:false,
        message:'No Category Found '
      })
    }

     res.status(200).send({
      success:true,
      message:'Updated Category Successfully'
     })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error In Update Category API',
      error
    })
  }
};

const deleteCategory = async(req,res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(500).send({
        success:false,
        message:'Please Provide Category Id To Deleted'
      })
    }
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).send({
        success:false,
        message:'Category not found'
      })
    }

    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message:'Category Deleted Successfully'
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error In Delete Category API',
      error
    })
  }
}

module.exports ={createCategory,getAllCategory,updateCategory,deleteCategory};
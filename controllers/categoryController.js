const Category=require('../models/category_Schema');

module.exports.addCategory=async function(req, res){

    let category= new Category({
        name:req.body.name,
        icon: req.body.icon,
        color:req.body.color
    })
    
    category= await category.save();
    if(category){
        return res.status(200).send({
            category,
            message: 'Category Added.....',
        });
    }else{
        return res.status(404).send('Cannot add category...')
    }
   
  
}


module.exports.deleteCategory= function(req, res){
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({
                success: true,
                message: 'the category is deleted'
            })
        }else {
            return res.status(400).json({
                success: false,
                message: 'Cannot find the category'
            })
        }
    }).catch(error=>{
        return res.status(400).json({
            success:false,
            error
        })
    })
}
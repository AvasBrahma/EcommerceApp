const Category=require('../models/category_Schema');


//function to post new category 
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

// function to delete the category with id
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

//function to get all the categiry
module.exports.getAllCategory=async function(req, res){
        const categoryList= await Category.find();

        if(categoryList){
            res.status(200).json({
                success:true,
                message: 'List of category :',
                categoryList
            })
        }else{
            res.status(500).json({
                success: false,
                message: 'No Category'
            })
        }

}


//function to get category by Id
module.exports.getCategoryById= async function(req, res){
    const category= await Category.findById(req.params.id);

    if(category){
        res.status(200).json({
            success:true,
            message: 'Category :',
            category
        })
    }else{
        res.status(500).json({
            success: false,
            message: 'No Category found with the requested Id'
        })
    }
}

//function to update the category
module.exports.updateCategory=async function(req, res){
     const category= await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color

     },{
        new: true
     })

    if(category){
        res.status(200).json({
            success:true,
            message: 'Category Updated',
            category
        })
    }else{
        res.status(500).json({
            success: false,
            message: 'Cannot Update the Category'
        })
    }
}
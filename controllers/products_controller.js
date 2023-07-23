const Product=require('../models/products_Schema');
const Category=require('../models/category_Schema');
const mongoose = require('mongoose');
// function to add product
module.exports.addProducts=async function(req, res){

    console.log("Into add products function........");
    try {
        if(req.body.category.length !== 24){
            return res.status(400).send({
                message:'Category ID should be length 24'
         })
        }
     const category=await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send({
                message:'No Category Found'
         })
       }
        let product=new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            image: req.body.image
        })  
        product= await product.save();
        if(product){
            return res.status(200).json({
                message: 'New Product Added',
                product
            })
        }else{
            return res.status(500).json({
            message:'Cannot Add New Product'

            })
        }
    }catch (error) {
        console.log('Internal servar error', error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
      }
      
}

//Functions to get all the products
module.exports.getAllProducts=async function(req, res){

  try {

    let filter={};
    if(req.query.category){
        filter={category:req.query.category.split(',')};
    }
    const products=await Product.find(filter).populate('category');
    if(products){
        return res.status(200).send({
            message: 'List Of Products',
            products
        })
    }else{
        return res.status(500).send({
            message: 'No Products Found....',
        })
    }
  } catch (error) {
    return res.status(400).send({ 
        message: 'Error : No able to find products',
        error: error
    });
  }

 
}

//Functions to get Products By Id
module.exports.getProductById=async function(req, res){

    try {
      const products=await Product.findById(req.params.id).populate('category');
      if(products){
          return res.status(200).send({
              message: 'Product Requested',
              products
          })
      }else{
          return res.status(500).send({
              message: 'No Product Found....',
          })
      }
    } catch (error) {
      return res.status(400).send({ 
          message: 'Error : No able to find the product',
          error: error
      });
    }
  
   
  }


  //Functions to get Products By Id
module.exports.getProductWithFewFields=async function(req, res){

    try {
      const products=await Product.find().selec('name image');
      if(products){
          return res.status(200).send({
              message: 'List Of Products',
              products
          })
      }else{
          return res.status(500).send({
              message: 'No Product Found....',
          })
      }
    } catch (error) {
      return res.status(400).send({ 
          message: 'Error : No able to find the products',
          error: error
      });
    }
  
   
  }

  //function to update the Products
module.exports.updateProduct=async function(req, res){

    try {
        if(req.body.category.length !== 24){
            return res.status(400).send({
                message:'Category ID should be length 24'
         })
        }
     const category=await Category.findById(req.body.category);
        if(!category){
            return res.status(400).send({
                message:'No Category Found'
         })
       }
     console.log(req.params.id);
        const product= await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            image: req.body.image
        },{
           new: true
        })
    
       if(product){
           res.status(200).json({
               success:true,
               message: 'Product Updated',
               product
           })
       }else{
           res.status(500).json({
               success: false,
               message: 'Cannot Update the Product'
           })
       }
        
    } catch (error) {
        return res.status(400).send({ 
            message: 'Error : Cannot Update the product',
            error: error
        });
    }
   
}

  // function to delete the Product with id
module.exports.deleteProduct= function(req, res){

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
            message: 'Invalid Product Id'
        });
    }

    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({
                success: true,
                message: 'the product is deleted'
            })
        }else {
            return res.status(400).json({
                success: false,
                message: 'Cannot find the product'
            })
        }
    }).catch(error=>{
        return res.status(400).json({
            success:false,
            error
        })
    })
}


  // function to get product Count
  module.exports.getProductCount=async function(req, res){
      
    try {
        const productCount= await Product.countDocuments();

        if(productCount){
           return res.status(200).json({
               success: true,
               productCount: productCount
           })
        }else{
            return res.status(400).json({
               success: false,
               message: 'Cannot find the product'
           })
        }
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            error
        })
    }
   

}

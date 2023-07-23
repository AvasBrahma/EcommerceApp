const Product=require('../models/products_Schema');
const Category=require('../models/category_Schema');

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
    const products=await Product.find();
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
      const products=await Product.findById(req.params.id);
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
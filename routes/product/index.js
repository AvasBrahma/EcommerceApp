const express=require('express');
const router=express.Router();

const productController=require('../../controllers/products_controller');



router.post('/add', productController.addProducts);

router.get('/allproducts', productController.getAllProducts);

router.get('/:id', productController.getProductById);
module.exports=router;
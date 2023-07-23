const express=require('express');
const router=express.Router();

const productController=require('../../controllers/products_controller');



router.post('/add', productController.addProducts);

router.get('/allproducts', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/get/count', productController.getProductCount);
module.exports=router;
const express=require('express');
const router=express.Router();

const categoryContoller=require('../../controllers/categoryController');
const { route } = require('../user');

router.post('/add', categoryContoller.addCategory);

router.delete('/delete/:id', categoryContoller.deleteCategory);

router.get('/allcategory', categoryContoller.getAllCategory);

router.get('/:id', categoryContoller.getCategoryById);

router.put('/:id', categoryContoller.updateCategory);

module.exports=router;
const express=require('express');
const router=express.Router();

const categoryContoller=require('../../controllers/categoryController');

router.post('/add', categoryContoller.addCategory);

router.delete('/delete/:id', categoryContoller.deleteCategory)

module.exports=router;
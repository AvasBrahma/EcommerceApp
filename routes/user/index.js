const express=require('express');
const router=express.Router();

const authContoller=require('../../controllers/auth_controller');

router.get('/register', authContoller.registerUser);



module.exports=router;
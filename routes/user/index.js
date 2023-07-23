const express=require('express');
const router=express.Router();

const authContoller=require('../../controllers/auth_controller');

router.post('/register', authContoller.registerUser);

router.get('/alluser', authContoller.getAllUser);

router.get('/:id', authContoller.getUserById);

router.post('/login', authContoller.login);

module.exports=router;
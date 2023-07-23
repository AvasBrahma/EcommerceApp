const User = require("../models/users_Schema");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
module.exports.registerUser = async function (req, res) {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 9),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      appartments: req.body.appartments,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();
    if (user) {
      return res.status(200).send({
        message: "New User Registered",
        user,
      });
    } else {
      return res.status(404).send("Cannot Register User");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

//function to get all the User
module.exports.getAllUser = async function (req, res) {
  try {
    const userList = await User.find().select('-passwordHash');

    if (userList) {
      res.status(200).json({
        success: true,
        message: "List of All User :",
        userList,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "No User Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

//function to get User by Id
module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (user) {
      res.status(200).json({
        success: true,
        message: "Requested User :",
        user,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "No User found with the requested Id",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

//function to login
module.exports.login=async function (req, res) {

    try {
        const user=await User.findOne({
            email:req.body.email
        })
        if(user){

            if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){

              const token= jwt.sign(
                {userId:user.id,
                   isAdmin:user.isAdmin 
                }, 
                'test123', { expiresIn: '1d'});
                  
                res.status(200).json({
                    success: true,
                    message: "User Authenticated",
                    username:user.name,
                    email: user.email,
                    token: token
                  })
            }else{
                res.status(200).json({
                    success: false,
                    message: "Password is Incorrect"
                  });
            }
          
        }else{
            res.status(400).json({
                success: false,
                message: "User Not Found"
              });
        }
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
          });
    }

    

}
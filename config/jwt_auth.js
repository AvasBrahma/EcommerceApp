const { expressjwt: jwt } = require("express-jwt");

const authJWT=jwt({
  secret: "test123",
  algorithms: ["HS256"],
  isRevoked: isRevoked
}).unless({
    path:[
        {url:'/category/allcategory', methods:['GET', 'OPTIONS']},
        {url:/^\/product(?:\/.*)?$/i, methods:['GET', 'OPTIONS']}, // allowing user to see all products without authorization
        '/user/login',
        '/user/register'
    ]
})
// above we are allowing the routes without authentication


async function isRevoked(req, token){
    if (!token.payload.isAdmin) {
      return true;
    }
  }
  
module.exports = authJWT;
const { expressjwt: jwt } = require("express-jwt");

const authJWT=jwt({
  secret: "test123",
  algorithms: ["HS256"],
  isRevoked: isRevoked
}).unless({
    path:[
        {url: '/product/allproducts', methods:['GET', 'OPTIONS']}, // allowing user to see all products with authorization
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
  
// async function isRevoked(req, payload) {

//     if (payload.isAdmin==false) {
//         console.log('Not Admin'); // reject the token if it is not admin
//         return true;
//       }
//       console.log('Admin');
//       return false;  // If the payload has the 'isAdmin' property, continue with the authentication
    
// }
module.exports = authJWT;
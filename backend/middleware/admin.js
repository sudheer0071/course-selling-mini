const  jwt  = require("jsonwebtoken");
const { Admin } = require("../db");
const secretKey = '12345'

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{

        const token = req.headers.authorization
        console.log(token);
        const decode = jwt.verify(token, secretKey) 
        const username = decode.username
        const password = decode.password
        // function admin
        const userfound =  await Admin.findOne({username:username, password:password})
        if (userfound) { 
            return next()
        }
        else{
            return res.status(404).send("Error in adding course")
        }   
    }
    catch(Error){
        res.status(404).send("Error in adding course")
    }
} 

module.exports = adminMiddleware;   
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const secretKey = '54321'


async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        
        const token = req.headers.authorization
        const decoded = jwt.verify(token, secretKey)
        const username = decoded.username
        const password = decoded.password
    
        if(await User.findOne({username:username, password:password})){
            return next()
        }
        else{
            return res.status(404).send("something went wrong")
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }

}

module.exports = userMiddleware;
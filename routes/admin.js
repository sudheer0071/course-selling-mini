const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db"); 
const jwt = require("jsonwebtoken");
const secretKey = '12345'
const router = Router(); 

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password
    
    const userExists = await Admin.findOne({username:username})
    if (!userExists) {
        const token = jwt.sign({username:username, password:password}, secretKey)
        Admin.create({
            username,
            password,
            token
        }) 
        res.json({message:"Admin created successfully", token:token})
    }
    else{
        res.json({message:"Username already exist try something unique"})
    }
}); 

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username 
    const password = req.body.password
    
    const admin = await Admin.findOne({username:username})
    const credentials = await Admin.findOne({username:username, password:password})

    if (!credentials) {
       return res.json({message:"Invalid Credentials"})
    }
    if (admin) { 
        
            // if (token) {
            // }
            res.json({message:"Fetching details", token: admin.token})
    }
    else{ 
        res.json({message:"User doesn't exist"})
    }
});    

router.post('/courses', adminMiddleware, async(req, res) => { 
    // // Implement course creation logic
    const { title, description, price, imageLink } = req.body; 
    
    const admin = await Course.findOne({title:title})
    if (admin) {
        res.json({ message: 'Course Already Exist'}) 
    }
    else{
        const course = await Course.create({
            title, description, price, imageLink
        }) 
        res.json({ message: 'Course created successfully', courseId: course._id }) 
    }
    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic 
    const all_courses = await Course.find()

    res.json({courses:all_courses})
});
 

module.exports = router; 
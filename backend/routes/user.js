const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const mongoose = require('mongoose');
const  jwt  = require("jsonwebtoken");
const secretKey = '54321'
 

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const {username, password} = req.body;
    
    const alreadyExist = await User.findOne({username:username})
    if (!alreadyExist) {
        const token = jwt.sign({username:username, password:password}, secretKey) 
        await User.create({username, password, token})
        res.json({ message: 'User created successfully', token:token })
    }
    else{
        res.json({message:"Username already exist try something Unique"})
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;

    const userExists = await User.findOne({username:username})
    const user = await User.findOne({username:username, password:password})
  
    if (!userExists) {
            res.json({message:"User doesn't exist"})
     }
    else { 
         if (user) {
            return res.json({message:"Fetching details", token: user.token})
        }
          res.json({message:"Invalid Credentials"})
         }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const all_courses = await Course.find() 
    res.json({allcourses:all_courses})
});
 
router.post('/buycourse' , userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.body.courseId 
    const username = req.username 
   
    const user = await User.findOne({username:username})

    const alreadyExist = await user.purchasedCourse.includes(id)
    console.log(alreadyExist);
    if (alreadyExist) {
        res.json({message: "You already bought this course"})
    }
    else{
        await User.updateOne({username:username},{"$push":{
            purchasedCourse:id
        }})
        res.json({ message: 'Course purchased successfully check your library' })    
    }
 
}); 
 
router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username 

    const showCourse = await User.findOne({username:username})
    console.log(showCourse);
    const all_courses = await Course.find({_id:{"$in":showCourse.purchasedCourse}}) 
    res.json({ 
        allcourses:all_courses
    }); 

}); 
 
module.exports = router 
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sastaa_course:sCXDuD7woxG4hLhR@cluster0.3b3ea4g.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String, 
    password:String,
    token:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String, 
    password:String,
    token:String, 
    purchasedCourse:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    }]
}); 

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:String,
    imageLink:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
} 
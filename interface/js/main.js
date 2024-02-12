// *************************************** User panel ************************************************

// const { User_token, signin_user } = require("./all_js.js");
const User_token = localStorage.getItem('User_token');
const Admin_token = localStorage.getItem('Admin_token');
// const User_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1bW15IiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNzA1ODc1MDMzfQ.HKbSJkIhdjfLSJw_Z0JfywidLYeeRCtbAlJ6GTUQmWk"

// async function fetchingToken(){
//   const response = 
// }

async function showCourses_user(){
  const response = await fetch("https://cheap-courses.onrender.com/user/courses",{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authentication':User_token
    }
  })
  
  if (response.ok) {
    const courses = await response.json()
     const all_courses = courses.allcourses.map(course => `
     <div id="bought" class="allcourses">
     <h3>Course Name: ${course.title}</h3>
     <p>Description: ${course.description}</p>
     <h5>Price: ${course.price}</h5>
     <button onclick="buyCourse('${course._id}')" class="buycourse"> Buy Course </button> 
     </div> 
     `).join('')
     document.getElementById("all_courses").innerHTML = `${all_courses}`
     //  signin_user(event)
    }
    else{
      console.log("error in fetching");
    } 
    
  }

  async function purchasedCourses(){
    try {
      
      const response = await fetch("https://cheap-courses.onrender.com/user/purchasedCourses",{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization': User_token
        }
      })
      
      if (response.ok) {
        const courses = await response.json();
        const coursesList = courses.allcourses.map(course => `
        <div class="purchasedcourses allcourses">
        <h3>Course Name: ${course.title}</h3>
        <p>Description: ${course.description}</p>
        <h5>Price: ${course.price}</h5>
        
        </div>
        `).join('');

        if (courses.allcourses.length == 0) {
          setTimeout(() => {
            document.getElementById("notpurchased").innerHTML=""
          }, 2000);
          document.getElementById("notpurchased").innerHTML="You haven't bought any coursesyet."
        }

        document.getElementById("purchased_courses").innerHTML = `
        ${coursesList} 
        `;
      }
      else{
        console.log("error in fetching");
            document.getElementById("purchased_courses").innerHTML = `
            <h4>Something went wrong :/ </h4>
            `
          }
        } catch (error) {
          console.log(error);
          console.log("something went wrong");
          console.log(User_token);
        }
        
      }
      
      async function buyCourse(courseId){
        const response = await fetch("https://cheap-courses.onrender.com/user/buycourse",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':User_token
          },
      body:JSON.stringify({courseId: courseId})
    })
 
  const msg = await response.json()
  if (response.ok) { 
    const message = msg.message
    console.log(message);
    if (message.includes("already")) {
      console.log("inside if");
      document.getElementById("notpurchased").innerHTML = `${msg.message}`
      setTimeout(() => {  
        document.getElementById("notpurchased").innerHTML = "" 
      }, 2500);
    }
    else{
      document.getElementById("purchased").innerHTML = `${msg.message}` 
      setTimeout(() => {  
        document.getElementById("purchased").innerHTML = "" 
      }, 2500);
    }
} 
else{
  console.log("error in fetching");
            document.getElementById("purchased_courses").innerHTML = `
            <h4>Something went wrong :/ </h4>
            `
}

}



// *************************************** Admin panel ************************************************


async function showCourses(){
  //***************** / http://localhost:3000 *********************
  const response = await fetch("https://cheap-courses.onrender.com/admin/courses",{
    method:'GET',
    headers :{
      'Content-Type':'application/json',
      'Authorization':Admin_token
    }
  })
  if (response.ok) { 
    const courses = await response.json()
    const allcourses = courses.courses.map(course =>(`
    <div class="allcourses">
      <h3>Course Name: ${course.title}</h3>
  <p>Description: ${course.description}</p>
  <h5>Price: ${course.price}</h5>
    </div>
    
  `)).join('')
  document.getElementById('all_courses').innerHTML = `${allcourses}`
}
else{
      console.log("error in fetching");
      document.getElementById("all_courses").innerHTML = `
      <h4>Something went wrong :/ </h4>
      `
     }
}

async function createdCourse(event){
 event.preventDefault() 
 const title  = document.getElementById("title").value 
 const description  = document.getElementById("desc").value 
 const price  = document.getElementById("price").value 

 if (!title || !description || !price) {
  alert('Please fill in all fields');
  document.getElementById("emptyFeild").innerHTML = `Any feild can't be empty! ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
  return; // Stop the function execution if any field is empty
}
// ************http://localhost:3000****************
 const response = await fetch("https://cheap-courses.onrender.com/admin/courses",{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Authorization':Admin_token
  },
  body:JSON.stringify({title:title, description:description, price:price, imageLink:"https://linktoimage.com"})
 })
  
 if (response.ok) {
  const msg = await response.json();  
  document.getElementById("created").innerHTML = `${msg.message}` 
    setTimeout(() => {  
      document.getElementById("created").innerHTML = "" 
    }, 2500);
    document.getElementById("create-course").innerHTML=''
 }
 else{
      console.log("error in fetching");
      document.getElementById("created").innerHTML = `
      <h4>Something went wrong :/ </h4>
      `
     }
}

function creatingCourse() {
const formContainer = document.getElementById("create-course");
formContainer.innerHTML = `
  <form class="course-create">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Name of course</label>
      <input type="text" class="form-control form-label" id="title" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Description</label>
      <input type="text" class="form-control form-label" id="desc">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword2" class="form-label">Price</label>
      <input type="number" class="form-control form-label" id="price">
    </div>
    <div class="submit-btn">
      <button id="submitBtn" onclick="createdCourse(event)" type="submit" class="btn btn-primary form-label">Submit</button>
    </div> 
  </form>
`;

} 
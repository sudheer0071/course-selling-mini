// *****************************  user pannel  ********************************************

// const User_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1bW15IiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNzA1ODc1MDMzfQ.HKbSJkIhdjfLSJw_Z0JfywidLYeeRCtbAlJ6GTUQmWk";
// const User_token = localStorage.getItem('User_token');
// let User_token
// let Admin_token;
async function signup_user(event){
  event.preventDefault() 
  const username = document.getElementById("email").value
  const password = document.getElementById("pass").value

  if (!username || !password) {
  alert('Please fill in all fields');
  document.getElementById("emptyFeild").innerHTML = `Any feild can't be empty! ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
  return; // Stop the function execution if any field is empty
}

console.log("username: "+username);
console.log("password: "+password);
  const response = await fetch("http://localhost:3000/user/signup",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({username:username, password:password})
  })
  if (response.ok) {
    const msg = await response.json();  
    const messagee = msg.message
    const User_token = msg.token
    localStorage.setItem('User_token', User_token);

    if (messagee.includes("already")) {
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
    return
    }
    console.log(User_token);
  document.getElementById("created").innerHTML = `${msg.message}` 
    setTimeout(() => {  
      document.getElementById("created").innerHTML = "" 
      window.location.href = "/user/user.html"
    }, 2500);  

  }
  else{
    console.log("error in fetching");
      document.getElementById("created").innerHTML = `
      <h4>Something went wrong :/ </h4>`
      document.getElementById("created").innerHTML = ` `
  }
}

async function signin_user(event){
  event.preventDefault() 
  const username = document.getElementById("email").value
  const password = document.getElementById("pass").value

  if (!username || !password) {
  alert('Please fill in all fields');
  document.getElementById("emptyFeild").innerHTML = `Any feild can't be empty! ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
  return; // Stop the function execution if any field is empty
} 
  const response = await fetch("http://localhost:3000/user/signin",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({username:username, password:password})
  })
  if (response.ok) {
    const msg = await response.json();  
    const messagee = msg.message
    const User_token = msg.token
    
    console.log(User_token);
    if (messagee.includes("doesn")) { 
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
      setTimeout(() => {  
        document.getElementById("emptyFeild").innerHTML = "" 
      }, 2500);
      return
    }
    
    if (messagee.includes("Invalid")) { 
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
      setTimeout(() => {  
        document.getElementById("emptyFeild").innerHTML = "" 
      }, 2500);
      return
    }
    
    localStorage.setItem('User_token', User_token);
  document.getElementById("created").innerHTML = `${msg.message}` 
    setTimeout(() => {  
      document.getElementById("created").innerHTML = "" 
      window.location.href = "/user/user.html"
    }, 2500);  

  }
  else{
    console.log("error in fetching");
      document.getElementById("created").innerHTML = `
      <h4>Something went wrong :/ </h4>`
      document.getElementById("created").innerHTML = ` `
  }
}

// *****************************  admin pannel  ********************************************

async function signup_admin(event){
  event.preventDefault() 
  const username = document.getElementById("email").value
  const password = document.getElementById("pass").value

  if (!username || !password) {
  alert('Please fill in all fields');
  document.getElementById("emptyFeild").innerHTML = `Any feild can't be empty! ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
  return; // Stop the function execution if any field is empty
}
 
  const response = await fetch("http://localhost:3000/admin/signup",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({username:username, password:password})
  })
  if (response.ok) {
    const msg = await response.json();  
    const messagee = msg.message
    const Admin_token = msg.token



    if (messagee.includes("already")) {
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
    return 
    }
    localStorage.setItem('Admin_token', Admin_token);
  document.getElementById("created").innerHTML = `${msg.message}` 
    setTimeout(() => {  
      document.getElementById("created").innerHTML = "" 
      window.location.href = "/admin/admin.html"    
      // window.location.href = "/admin/admin.html"
    }, 2500);  
  
  }  
  else{
    console.log("error in fetching");
      document.getElementById("created").innerHTML = `
      <h4>Something went wrong :/ </h4>`
      document.getElementById("created").innerHTML = ` `
  }
}

  
async function signin_admin(event){
  event.preventDefault() 
  const username = document.getElementById("email").value
  const password = document.getElementById("pass").value

  if (!username || !password) {
  alert('Please fill in all fields');
  document.getElementById("emptyFeild").innerHTML = `Any feild can't be empty! ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
  return; // Stop the function execution if any field is empty
} 
  const response = await fetch("http://localhost:3000/admin/signin",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({username:username, password:password})
  })
  if (response.ok) {
    const msg = await response.json();  
    const messagee = msg.message
    const Admin_token = msg.token

    if (messagee.includes("doesn")) { 
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
    return
    }
    
    if (messagee.includes("Invalid")) { 
      document.getElementById("emptyFeild").innerHTML = `${messagee} ` 
    setTimeout(() => {  
      document.getElementById("emptyFeild").innerHTML = "" 
    }, 2500);
    return
    }
    

    localStorage.setItem('Admin_token', Admin_token);
  document.getElementById("created").innerHTML = `${msg.message}` 
    setTimeout(() => {  
      document.getElementById("created").innerHTML = ""  
      window.location.href = "/interface/admin/admin.html"
      // window.location.href = "admin/admin.html"
    }, 2500);  

  }
  else{
    console.log("error in fetching");
      document.getElementById("created").innerHTML = `
      <h4>Something went wrong :/ </h4>`
      document.getElementById("created").innerHTML = ` `
  }
}


 
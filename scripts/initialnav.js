import { navbar }  from "../components/navbar.js";
//console.log(navbar)
//dropdown-content

let navbardiv = document.getElementById("nav-container")
navbardiv.innerHTML = navbar();



// signup start from here ////
const showsignup = document.getElementById("gotosignup")
showsignup.onclick = function () {
  document.getElementById("login").style.display ="none";
  document.getElementById("signup").style.display ="block"
}

let startfill = document.getElementById("signup-details");
startfill.addEventListener('submit', registerUser)
// var userStack=JSON.parse(localStorage.getItem("userDataBase"))||[];
let  userData;

async function registerUser(event){
  event.preventDefault();
  var name = document.getElementById("innam").value 
  var email = document.getElementById("inmail").value 
  var password = document.getElementById("inpass").value 
  var mobileNumber = document.getElementById("innum").value 

  var flag=true;

  if(name == ""){
      let text = document.getElementById("validnam");
      text.style.color ="red";  
      flag=false;
  }

  if(email == ""){
    let text = document.getElementById("validmail");
    text.style.color ="red";
    flag=false;
  }

  if(password == ""){
    let text = document.getElementById("validpass");
    text.style.color ="red";
    flag=false;
  }

  if(mobileNumber == "" || mobileNumber.length != 10 ){
    let text = document.getElementById("validnum");
    text.style.color ="red";
    text.innerHTML ="*Invalid Mobile Number";
    flag=false;
  }

  let userDataBase = {
    name,
    email,
    password,
    mobileNumber
  }

   userData = JSON.stringify(userDataBase);
     console.log(userData);
    //  let url = "http://localhost:5656/register";
    let url = "https://revv-backend-deploy.herokuapp.com/register";
      try {   
        let response = await fetch(url, {
          method: "POST",
          body: userData,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        let ress = await response.json();   
        console.log(ress)   
        if(!response.ok){
          throw new Error(ress.message)
        }
	
         alert("Register successfully");   
         document.getElementById("login").style.display ="block";
         document.getElementById("signup").style.display ="none"
      } catch (err) {
        console.log("abc")
        alert(err.message);
      }       
   } 
  


// login start from here ////

let loginshow = document.getElementById("logshow")
loginshow.onclick = function() {
document.getElementById("login").style.display ="block"
}

let checkdetail = document.getElementById("signin-details");
checkdetail.addEventListener("submit", signin);

let userDatas;
async function signin(event){
event.preventDefault();

var outmail = document.getElementById("outmail").value;
var outpass = document.getElementById("outpass").value;

if (outmail == "" || outpass == "" )
{
 alert("Please fill all info");
} 
else{
console.log(outmail)
  userDatas = {
  email: outmail,
  password: outpass 
};
}

// console.log("userDatas",userDatas)
let inuserData = JSON.stringify(userDatas); 
   try{
      // let url = "http://localhost:5656/login";
      let url = "https://revv-backend-deploy.herokuapp.com/login";
      let response = await fetch(url, {
        method: "POST",
        body: inuserData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let res = await response.json();
      console.log(response)
      if(!response.ok){
        throw new Error(ress.message)
      }
      localStorage.setItem("token",JSON.stringify(res.token));
      localStorage.setItem("username",JSON.stringify(res.user.name));
      alert("Login successfully");
      document.getElementById("login").style.display ="none";
      window.location.reload();
      // getUser(res.token,res.user.name)
      // console.log(res.token, res.user.name)
   

     

      }
      catch (err) {
        alert(err.message);
      }
}


// let usernameof = JSON.parse(localStorage.getItem("loginData"));
// console.log(usernameof);


let namm = localStorage.getItem("username")
let tok = localStorage.getItem("token")

if(namm != "" && tok != "" )
{
 document.getElementById("login").style.display ="none";
  // document.getElementById("logshow").style.display ="none";
  let showname = document.getElementById("x")
  showname.innerHTML = namm;
  let showlogo = document.getElementById("signlogo")
  showlogo.src ="https://www.revv.co.in/grapheneImages/newopen/ic-web-profile-nav.svg"
  showlogo.style.width = "50px"
  document.getElementById("droparrow").style.display="block"
}
else {
  let loggg = "Login/Signup";
  let showname = document.getElementById("x")
  showname.innerHTML = loggg;
  let showlogo = document.getElementById("signlogo")
  showlogo.src ="https://www.revv.co.in/grapheneImages/newopen/ic-web-profile-login.svg"
  showlogo.style.width = "40px"
  document.getElementById("droparrow").style.display="none"
}



document.getElementById("logout").addEventListener("click", () => {
  localStorage.setItem("token", "")
  localStorage.setItem("username", "")
  // document.getElementById("login").style.display ="block";
  // window.localStorage.removeItem("token");
  // window.localStorage.removeItem("username"); 

  let loggg = "Login/Signup";
  let showname = document.getElementById("x")
  showname.innerHTML = loggg;
  let showlogo = document.getElementById("signlogo")
  showlogo.src ="https://www.revv.co.in/grapheneImages/newopen/ic-web-profile-login.svg"
  showlogo.style.width = "40px"
  document.getElementById("droparrow").style.display="none"
});

//single user
let usernameloged = JSON.parse(localStorage.getItem("username"));
let tokenloged = JSON.parse(localStorage.getItem("token"));

let getUser = async (user, token) => {
  let url = `https://revv-backend-deploy.herokuapp.com?/user/name=${user}`;

  try {
    let responce = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await responce.json(); 
    localStorage.setItem(
      "loginData",
      JSON.stringify({ name: data.name, id: data._id, token })
    );
   
   
  } catch (err) {
    console.log(err);
  }
};




// function forcross btn to close login//

let displayin = document.getElementById("cross1")
displayin.onclick = function close () {
  document.getElementById("login").style.display ="none";
}

let displayup = document.getElementById("cross2")
displayup.onclick = function close () {
  document.getElementById("signup").style.display ="none"
}

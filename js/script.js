
const usernameInput = document.getElementById("usernameInput"); 
const userEmailInput = document.getElementById("userEmailInput"); 
const userPasswordInput = document.getElementById("userPasswordInput"); 
const signupBtn = document.getElementById("signupBtn"); 

let usersinfo;
if(localStorage.getItem("users") == null)
{
    usersinfo = [];
}
else
{
    usersinfo = JSON.parse(localStorage.getItem("users"));
}
function signUp()
{

    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false)
    {
        let user = 
        {
            name:usernameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        }

        usersinfo.push(user)
        localStorage.setItem("users", JSON.stringify(usersinfo));
        const confirmMsg = document.getElementById("confirmMsg");
        confirmMsg.classList.replace("d-none", "d-block");
        const signin = document.getElementById("signin")
        signin.classList.replace("d-none", "d-block");
    }
    else
    {
        const tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }

}

function usernameValidation()
{
    const usernameAlert = document.getElementById("usernameAlert");

    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if( regex.test(usernameInput.value) == true && usernameInput.value != "")
    {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");

        return false
    }
}
function userPasswordValidation()
{
    let regex = /^.{5,15}$/;
    const userPasswordAlert = document.getElementById("userPasswordAlert");

    if( regex.test(userPasswordInput.value) == true && userPasswordInput.value != "")
    {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false
    }
}

function userEmailValidation()
{
    const userEmailAlert = document.getElementById("userEmailAlert");

    let regex = /@[a-z]{5,10}(\.com)$/;
    if( regex.test(userEmailInput.value) == true && userEmailInput.value != "")
    {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false
    }
}

function isExist()
{
    let accountExistMsg = document.getElementById("accountExistMsg");
    
    for(let i = 0; i < usersinfo.length; i++)
    {

        if(usersinfo[i].name.toLowerCase() == usernameInput.value.toLowerCase() || usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase())
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            usernameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            userPasswordInput.classList.remove("is-valid");

            return true
        }
    }
    return false
}
function userInputsValidation()
{
    usernameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (usernameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
}



var username = localStorage.getItem("sessionUsername");
function login()
{
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");
    let loginBtn = document.getElementById("loginBtn");
    let wrongMsg = document.getElementById("wrongMsg");

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        let fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false
    }

    for(var i = 0; i < usersinfo.length; i++)
    {
        if(usersinfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() && usersinfo[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            
            localStorage.setItem('sessionUsername', usersinfo[i].name)
            loginBtn.setAttribute("href", "welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
        }
    }
}
function displayWelcomeUser()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;

}

function logout() {
    localStorage.removeItem('sessionUsername')
}


//      




var imgs=Array.from(document.querySelectorAll(".img-fluid"));
var lightboxcontainer=document.getElementById("lightbox-container");
var lightboxItem=document.getElementById("lightbox-item");
var closeIcon=document.getElementById("close");
var prevIcon=document.getElementById("prev");
var nextIcon=document.getElementById("next");
var currentIndex=0;

for(var i=0;i<imgs.length;i++){
    imgs[i].addEventListener("click",function(e){
        lightboxcontainer.style.display="flex";
        var imgSrc=e.target.src;
        lightboxItem.style.backgroundImage=`Url(${imgSrc})`
        currentIndex=imgs.indexOf(e.target);
    })
}

closeIcon.addEventListener("click",closeSlider);
function closeSlider(){
    lightboxcontainer.style.display="none";
}

nextIcon.addEventListener("click",getNextSlide)

function getNextSlide(){
    currentIndex++; 
    if(currentIndex==imgs.length){
        currentIndex=0;
    }
  var imgSrc=imgs[currentIndex].src;
  lightboxItem.style.backgroundImage=`Url(${imgSrc})`

}

prevIcon.addEventListener("click",getPrevSlide)
function getPrevSlide(){
    currentIndex--; 
    if(currentIndex<0){
        currentIndex=imgs.length-1
    }
  var imgSrc=imgs[currentIndex].src;
  lightboxItem.style.backgroundImage=`Url(${imgSrc})`

}

document.addEventListener("keydown",function(e){
  if(e.key=="Escape"){
    closeSlider()
  }
  else if(e.key=="ArrowRight"){
    getNextSlide()
  }
  else if(e.key=="ArrowLeft"){
    getPrevSlide()
  }
})

lightboxcontainer.addEventListener("click",function(e){
    if(e.target!=lightboxItem&&e.target!=prevIcon&&e.target!=nextIcon){
        closeSlider()
    }
})




// var httpRequest=new XMLHttpRequest();
// var posts=[];
// httpRequest.open("GET","https://jsonplaceholder.typicode.com/posts");
// httpRequest.send();
// httpRequest.addEventListener("readystatechange",function(){

//   if(httpRequest.readyState==4&&httpRequest.status==200)
//   {
//    posts= JSON.parse(httpRequest.response);
//    displayPosts();
//   }
// })

// function displayPosts(){
//   var cols='';
// for(var i=0;i<posts.length;i++){
//   cols+=
//   `
//     <div class="col-md-3">
//       <div>
//         <h3>${posts[i].id}</h3>
//         <h2>${posts[i].title}</h2>
//         <p>${posts[i].body}</p>
//       </div>
//     </div>
//   `
// }
//   document.getElementById("postsRow").innerHTML=cols
// }
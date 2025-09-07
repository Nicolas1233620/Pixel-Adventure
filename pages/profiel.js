import {updateProfile} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
let user = JSON.parse(localStorage.getItem("user"))
console.log(user);
if (!user) {
    document.getElementById("iHaveAccount").style = "display : none"
    document.getElementById("noAccount").style = "display : block"
} else {
    document.getElementById("iHaveAccount").style = "display : block"
    document.getElementById("noAccount").style = "display : none"
    document.getElementById("name").textContent = `your name : ${user.displayName}`
}
let pfps = document.querySelectorAll(".PFP")
console.log(pfps);
for (let i = 0; i < pfps.length; i++) {
    pfps[i].onclick = ()=>{
        updateProfile(user,{
        photoURL:pfps[i].src
        })
        .then((user)=>{
            localStorage.setItem("user",JSON.stringify(user))
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}


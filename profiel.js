import {updateProfile} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../app/firebase.js";
let user = JSON.parse(localStorage.getItem("user"))
let photoURL = localStorage.getItem("pfp")
console.log(auth);
if (!user) {
    document.getElementById("iHaveAccount").style = "display : none"
    document.getElementById("noAccount").style = "display : block"
} else {
    document.getElementById("iHaveAccount").style = "display : block"
    document.getElementById("noAccount").style = "display : none"
    document.getElementById("name").textContent = `your name : ${user.displayName}`
    document.getElementById("photo").src = photoURL
}
let pfps = document.querySelectorAll(".PFP")
console.log(pfps);
for (let i = 0; i < pfps.length; i++) {
    pfps[i].onclick = ()=>{
        updateProfile(auth.currentUser,{
        photoURL:pfps[i].src
        })

        .then(()=>{
            localStorage.setItem("pfp",pfps[i].src)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}


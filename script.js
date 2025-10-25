import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../app/firebase.js";

let signIn = document.getElementById("signIn")
let signUp = document.getElementById("signUp")

if(signIn){
    document.getElementById("signIn").onclick = () => setUser(signInWithEmailAndPassword,false)
}else document.getElementById('signUp').onclick = () => setUser(createUserWithEmailAndPassword,true)

function setUser(fn,isSingUp) {
    let name;
    isSingUp?name = document.getElementById("name").value:""
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(true);
    
    fn(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (name) {
                updateProfile(user, {
                    displayName: name
                })
            }
            localStorage.setItem("user",JSON.stringify(auth.currentUser))
            // Signed up 
            console.log(userCredential)
            console.log(auth.currentUser)
        })
        .catch((error) => {
            console.log(error);

            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}
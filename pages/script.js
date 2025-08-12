import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { auth } from "../app/firebase.js";

document.getElementById("signIn").onclick = () => setUser(signInWithEmailAndPassword,false)
document.getElementById('signUp').onclick = () => setUser(createUserWithEmailAndPassword,true)
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
            localStorage.setItem("user",JSON.stringify(user))
            // Signed up 
            console.log(userCredential)
            // ...
        })
        .catch((error) => {
            console.log(error);

            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}



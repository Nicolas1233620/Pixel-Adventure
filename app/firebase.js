
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDaSE3zrtsm1DwQ-gngiJ3o9YtGbLaW0ww",
    authDomain: "pixel-adventure-7f8a9.firebaseapp.com",
    projectId: "pixel-adventure-7f8a9",
    storageBucket: "pixel-adventure-7f8a9.firebasestorage.app",
    messagingSenderId: "133840985896",
    appId: "1:133840985896:web:63c368c5ea1b7b6f497a1d",
    measurementId: "G-2XTLS72P3G"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
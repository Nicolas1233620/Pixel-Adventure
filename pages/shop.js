import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "../app/firebase.js"
let localAllItems = JSON.parse(localStorage.getItem("allItems"))
async function buyShop() {
    let coins
    let jump
    let speed
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        const docRef = doc(db, "allItems", user.uid);
        const docSnap = await getDoc(docRef);
        jump = docSnap.data() ? docSnap.data().jump : 330
        coins = docSnap.data() ? docSnap.data().coins : 0
        speed = docSnap.data() ? docSnap.data().speed : 160
    } else {
        jump = localAllItems ? localAllItems.jump : 330
        coins = localAllItems ? localAllItems.coins : 0
        speed = localAllItems ? localAllItems.speed : 160
    }
    if (coins >= 10) {
        coins = coins - 10
        jump = jump + 10
    } else {
        alert("zu wenich coins. dein Kontostand ist : ", coins)
    }
    if (user) {
        await setDoc(doc(db, "allItems", user.uid), {
            coins,
            speed,
            jump,
        });

    } else {
        let allItems = {
            coins,
            speed,
            jump
        }
        localStorage.setItem("allItems", JSON.stringify(allItems))
    }
}
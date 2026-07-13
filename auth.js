import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.registerUser = async function(){

const nama=document.getElementById("nama").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const role=document.getElementById("role").value;

try{

const userCredential=
await createUserWithEmailAndPassword(auth,email,password);

await setDoc(doc(db,"users",userCredential.user.uid),{

nama:nama,
email:email,
role:role

});

alert("Registrasi berhasil");

location.href="login.html";

}catch(e){

alert(e.message);

}

}

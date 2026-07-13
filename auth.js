import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ==========================
// REGISTER
// ==========================

window.registerUser = async function () {

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if(!nama || !email || !password){
      alert("Semua data wajib diisi");
      return;
  }

  try{

      const userCredential =
      await createUserWithEmailAndPassword(
          auth,
          email,
          password
      );

      await setDoc(
          doc(db,"users",userCredential.user.uid),
          {
              nama:nama,
              email:email,
              role:role,
              saldo:0,
              createdAt:new Date()
          }
      );

      alert("Registrasi berhasil");

      location.href="login.html";

  }catch(error){

      alert(error.message);

  }

}



// ==========================
// LOGIN
// ==========================

window.loginUser = async function(){

    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        location.href="dashboard.html";

    }catch(error){

        alert(error.message);

    }

}



// ==========================
// CEK LOGIN
// ==========================

window.cekLogin=function(){

    onAuthStateChanged(auth,async(user)=>{

        if(!user){

            location.href="login.html";
            return;

        }

        const snap=await getDoc(doc(db,"users",user.uid));

        if(snap.exists()){

            const data=snap.data();

            const nama=document.getElementById("namaUser");

            if(nama){

                nama.innerHTML=data.nama;

            }

        }

    });

}



// ==========================
// LOGOUT
// ==========================

window.logoutUser=async function(){

    await signOut(auth);

    location.href="login.html";

}

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

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        nama: nama,
        email: email,
        role: role,
        createdAt: new Date()
      }
    );

    alert("Registrasi berhasil");

    location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

};


// ==========================
// LOGIN
// ==========================

window.loginUser = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login berhasil");

    location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};


// ==========================
// CEK LOGIN
// ==========================

window.cekLogin = function () {

  onAuthStateChanged(auth, async (user) => {

    if (!user) {

      location.href = "login.html";
      return;

    }

    const docRef = doc(db, "users", user.uid);

    const snap = await getDoc(docRef);

    if (snap.exists()) {

      const data = snap.data();

      const nama = document.getElementById("namaUser");

      if (nama) {

        nama.innerHTML = data.nama;

      }

    }

  });

};


// ==========================
// LOGOUT
// ==========================

window.logoutUser = async function () {

  await signOut(auth);

  location.href = "login.html";

};

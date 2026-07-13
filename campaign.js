import { db, auth } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.simpanCampaign = async function () {

  const judul = document.getElementById("judul").value.trim();
  const reward = Number(document.getElementById("reward").value);
  const kategori = document.getElementById("kategori").value;
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const kuota = Number(document.getElementById("kuota").value);
  const deadline = document.getElementById("deadline").value;

  if (!judul || !reward || !kategori || !deskripsi || !kuota || !deadline) {
    alert("Semua data wajib diisi.");
    return;
  }

  try {

    const user = auth.currentUser;

    await addDoc(collection(db, "campaigns"), {

      judul,
      reward,
      kategori,
      deskripsi,
      kuota,
      deadline,

      brandId: user ? user.uid : "",

      status: "Aktif",

      createdAt: serverTimestamp()

    });

    alert("Campaign berhasil dibuat.");

    document.getElementById("campaignForm").reset();

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

}

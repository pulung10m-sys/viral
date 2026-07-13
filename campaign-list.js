import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container=document.getElementById("campaignList");

async function loadCampaign(){

const querySnapshot=await getDocs(collection(db,"campaigns"));

querySnapshot.forEach(doc=>{

const c=doc.data();

container.innerHTML+=`

<div class="card">

<h2>${c.judul}</h2>

<p><b>Kategori :</b> ${c.kategori}</p>

<p><b>Reward :</b> Rp ${c.reward}</p>

<p><b>Kuota :</b> ${c.kuota}</p>

<p><b>Status :</b> ${c.status}</p>

<button onclick="gabung('${doc.id}')">

Gabung Campaign

</button>

</div>

`;

});

}

loadCampaign();

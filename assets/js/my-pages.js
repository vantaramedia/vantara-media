const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const addBtn=document.getElementById("addPageBtn");
const modal=document.getElementById("pageModal");
const closeBtn=document.getElementById("closePopup");
const pageForm=document.getElementById("pageForm");

addBtn.onclick=function(){

modal.style.display="flex";

};

closeBtn.onclick=function(){

modal.style.display="none";

pageForm.reset();

};

window.onclick=function(e){

if(e.target==modal){

modal.style.display="none";

pageForm.reset();

}

};

pageForm.addEventListener("submit",async function(e){

e.preventDefault();

const creatorId=
localStorage.getItem("creatorId") || "TEST001";

const formData=new URLSearchParams();

formData.append("action","savePage");

formData.append("creatorId",creatorId);

formData.append("platform",
document.getElementById("platform").value);

formData.append("pageName",
document.getElementById("pageName").value);

formData.append("username",
document.getElementById("username").value);

formData.append("followers",
document.getElementById("followers").value);

try{

const response=await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:formData

});

const result=(await response.text()).trim();

if(result=="Success"){

alert("Page Added Successfully!");

modal.style.display="none";

pageForm.reset();

location.reload();

}else{

alert(result);

}

}catch(err){

console.log(err);

alert("Connection Error");

}

});

// =========================
// Load Creator Pages
// =========================

const pagesTable = document.getElementById("pagesTable");

async function loadPages() {

    const creatorId =
localStorage.getItem("creatorId") || "TEST001";

    try{

        const response = await fetch(API_URL + "?action=getPages&creatorId=" + creatorId);

        const data = await response.json();

        console.log(data);

        pagesTable.innerHTML = "";

        if(data.length===0){

            pagesTable.innerHTML=`
            <tr>
            <td colspan="6">No Pages Added Yet.</td>
            </tr>
            `;

            return;

        }

    data.forEach(page => {

pagesTable.innerHTML += `
<tr>

<td>${page.platform}</td>

<td>${page.pageName}</td>

<td>${page.username}</td>

<td>${page.followers}</td>

<td>${page.status}</td>

<td>

<button class="edit-btn"
data-id="${page.pageId}">
Edit
</button>

<button class="delete-btn"
data-id="${page.pageId}">
Delete
</button>

</td>

</tr>
`;

});

    }catch(err){

        console.log(err);

    }

}

loadPages();

// =========================
// Edit & Delete Buttons
// =========================

document.addEventListener("click", async function(e){

// Edit
if(e.target.classList.contains("edit-btn")){

alert("Edit feature next step me add karenge.");

}

// Delete
if(e.target.classList.contains("delete-btn")){

const pageId = e.target.dataset.id;

if(!confirm("Delete this page?")) return;

const formData = new URLSearchParams();

formData.append("action","deletePage");
formData.append("pageId",pageId);

try{

const response = await fetch(API_URL,{

method:"POST",

body:formData

});

const result = await response.text();

if(result.trim()=="Success"){

alert("Page Deleted");

loadPages();

}else{

alert(result);

}

}catch(err){

console.log(err);

}

}

});

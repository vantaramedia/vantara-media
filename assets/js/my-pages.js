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

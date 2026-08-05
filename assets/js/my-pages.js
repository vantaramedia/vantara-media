const addBtn=document.getElementById("addPageBtn");

const modal=document.getElementById("pageModal");

const closeBtn=document.getElementById("closePopup");

addBtn.onclick=function(){

modal.style.display="flex";

};

closeBtn.onclick=function(){

modal.style.display="none";

};

window.onclick=function(e){

if(e.target==modal){

modal.style.display="none";

}

};

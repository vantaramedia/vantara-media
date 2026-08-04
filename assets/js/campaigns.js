// ==============================
// Campaign Search
// ==============================

const searchCampaign = document.getElementById("searchCampaign");

if (searchCampaign) {

searchCampaign.addEventListener("keyup", function () {

const filter = this.value.toLowerCase();

const rows = document.querySelectorAll("#campaignTable tr");

rows.forEach(row => {

const text = row.innerText.toLowerCase();

row.style.display = text.includes(filter) ? "" : "none";

});

});

}

// ==============================
// Manage Button
// ==============================

const manageButtons = document.querySelectorAll(".view-btn");

manageButtons.forEach(button => {

button.addEventListener("click", function () {

const row = button.closest("tr");

const campaign = row.children[1].innerText;

alert("Campaign Manager\n\n" + campaign);

});

});

// ==============================
// Add Campaign
// ==============================

const addBtn = document.querySelector(".add-btn");

if(addBtn){

addBtn.addEventListener("click",function(){

alert("Add Campaign feature will be connected with Google Sheets in next step.");

});

}

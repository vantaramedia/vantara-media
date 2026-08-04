// =========================================
// Vantara Media Campaign Manager
// =========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec?action=campaigns";

const campaignTable = document.getElementById("campaignTable");

const totalCampaigns = document.getElementById("totalCampaigns");
const activeCampaigns = document.getElementById("activeCampaigns");
const closedCampaigns = document.getElementById("closedCampaigns");

async function loadCampaigns() {

try {

const response = await fetch(API_URL);

const campaigns = await response.json();

campaignTable.innerHTML = "";

let active = 0;
let closed = 0;

campaigns.forEach(campaign => {

if(campaign.status==="Active") active++;
else closed++;

campaignTable.innerHTML += `
<tr>

<td>${campaign.id}</td>

<td>${campaign.campaign}</td>

<td>${campaign.platform}</td>

<td>
<span class="${
campaign.status==="Active"
? "approved"
: "pending"
}">
${campaign.status}
</span>
</td>

<td>${new Date(campaign.deadline).toLocaleDateString()}</td>

<td>
<button
class="view-btn"
data-id="${campaign.id}">
Manage
</button>
</td>

</tr>
`;

});
    totalCampaigns.innerText = campaigns.length;
activeCampaigns.innerText = active;
closedCampaigns.innerText = closed;

initButtons();

} catch(error){

console.error(error);

campaignTable.innerHTML =
"<tr><td colspan='6'>Failed to load campaigns.</td></tr>";

}

}

// ===============================
// Search
// ===============================

const searchCampaign =
document.getElementById("searchCampaign");

if(searchCampaign){

searchCampaign.addEventListener("keyup",function(){

const filter=this.value.toLowerCase();

const rows=document.querySelectorAll("#campaignTable tr");

rows.forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(filter)
? ""
: "none";

});

});

}

// ===============================
// Manage Button
// ===============================

function initButtons(){

document.querySelectorAll(".view-btn").forEach(btn=>{

btn.onclick=function(){

alert(
"Campaign ID : " +
this.dataset.id +
"\n\nCampaign Manager feature coming next."
);

};

});

}

loadCampaigns();

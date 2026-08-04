const API_URL = "https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const tbody = document.getElementById("creatorTableBody");

const totalCreators = document.getElementById("totalCreators");
const pendingCreators = document.getElementById("pendingCreators");
const approvedCreators = document.getElementById("approvedCreators");
const rejectedCreators = document.getElementById("rejectedCreators");

fetch(API_URL)
.then(res=>res.json())
.then(data=>{

totalCreators.innerText=data.length;

let pending=0;
let approved=0;
let rejected=0;

tbody.innerHTML="";

data.reverse().forEach(item=>{

const status=(item["Status"]||item["Status "]||"Pending").trim();

if(status==="Pending") pending++;
if(status==="Approved") approved++;
if(status==="Rejected") rejected++;

tbody.innerHTML+=`
<tr>

<td>${item["Application ID"]}</td>

<td>${item["Name"]}</td>

<td>${item["Instagram"]}</td>

<td>${item["Platform"]}</td>

<td>${item["Followers"]}</td>

<td>
<span class="status ${status.toLowerCase()}">
${status}
</span>
</td>

<td>
<button class="view-btn">View</button>
</td>

</tr>
`;

});

pendingCreators.innerText=pending;
approvedCreators.innerText=approved;
rejectedCreators.innerText=rejected;

});

// ==============================
// Vantara Media Creator Dashboard
// ==============================

// Temporary Login Session
const creatorEmail = localStorage.getItem("creatorEmail");

if (!creatorEmail) {

    window.location.href = "login.html";

}

// Welcome Message
document.getElementById("creatorWelcome").innerHTML =
`Welcome back 👋 <br><small>${creatorEmail}</small>`;

// Temporary Dashboard Stats
document.getElementById("totalPages").innerText = "0";
document.getElementById("totalApplications").innerText = "0";
document.getElementById("activeCampaigns").innerText = "0";

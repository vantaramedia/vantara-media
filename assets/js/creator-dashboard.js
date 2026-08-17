// ==============================
// Vantara Media Creator Dashboard
// ==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";


// ==============================
// LOGIN SESSION CHECK
// ==============================

const creatorId =
localStorage.getItem("creatorId");

const creatorName =
localStorage.getItem("creatorName");

const creatorEmail =
localStorage.getItem("creatorEmail");

const creatorStatus =
localStorage.getItem("creatorStatus");


if (!creatorId || !creatorEmail) {

    window.location.href = "login.html";

}


// ==============================
// WELCOME MESSAGE
// ==============================

document.getElementById("creatorWelcome").innerHTML =
`Welcome back 👋 <br>
<small>${creatorName || creatorEmail}</small>`;


// ==============================
// CREATOR STATUS
// ==============================

const statusElement =
document.querySelector(".creator-status span");

if (statusElement) {

    statusElement.innerText =
    creatorStatus || "Pending";

}


// ==============================
// LOAD MY PAGES COUNT
// ==============================

async function loadPageCount() {

    try {

        const response = await fetch(
            API_URL +
            "?action=getPages&creatorId=" +
            encodeURIComponent(creatorId)
        );

        const pages = await response.json();

        document.getElementById("totalPages").innerText =
            pages.length;

    }

    catch (error) {

        console.log("Page count error:", error);

        document.getElementById("totalPages").innerText =
            "0";

    }

}


// ==============================
// LOAD APPLICATION COUNT
// ==============================

async function loadApplicationCount() {

    try {

        const response = await fetch(
            API_URL +
            "?action=myApplications&creatorId=" +
            encodeURIComponent(creatorId)
        );

        const applications =
            await response.json();

        document.getElementById(
            "totalApplications"
        ).innerText =
            applications.length;

    }

    catch (error) {

        console.log(
            "Application count error:",
            error
        );

        document.getElementById(
            "totalApplications"
        ).innerText =
            "0";

    }

}


// ==============================
// START DASHBOARD
// ==============================

loadPageCount();
loadApplicationCount();

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email==="" || password===""){
        alert("Please fill all fields.");
        return;
    }

    // Temporary login
    localStorage.setItem("creatorEmail", email);

    alert("Login successful!");

    window.location.href="creator-dashboard.html";

});

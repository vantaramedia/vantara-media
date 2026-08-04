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

    try{

        const formData = new URLSearchParams();

        formData.append("action","login");
        formData.append("email",email);
        formData.append("password",password);

        const response = await fetch(API_URL,{

            method:"POST",
            body:formData

        });

        const result = await response.json();

        if(result.success){

            localStorage.setItem("creatorId",result.creatorId);
            localStorage.setItem("creatorName",result.name);
            localStorage.setItem("creatorEmail",result.email);
            localStorage.setItem("creatorTelegram",result.telegram);
            localStorage.setItem("creatorStatus",result.status);

            alert("Login Successful!");

            window.location.href="creator-dashboard.html";

        }else{

            alert("Invalid Email or Password");

        }

    }catch(err){

        console.log(err);

        alert("Connection Error");

    }

});

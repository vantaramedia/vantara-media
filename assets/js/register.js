const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector("button");

submitBtn.disabled = true;
submitBtn.innerText = "Submitting...";
    
    const data = {
      name: document.querySelector('input[placeholder="Enter your name"]').value.trim(),
      instagram: document.querySelector('input[placeholder="@username"]').value.trim(),
      platform: document.querySelectorAll("select")[0].value,
      followers: document.querySelector('input[placeholder="Example: 50K"]').value.trim(),
      category: document.querySelectorAll("select")[1].value,
      contact: document.querySelector('input[placeholder="Email or Telegram username"]').value.trim()
    };

    if (!data.name || !data.instagram || !data.followers || !data.contact) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("instagram", data.instagram);
    formData.append("platform", data.platform);
    formData.append("followers", data.followers);
    formData.append("category", data.category);
    formData.append("contact", data.contact);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.text();

// 👇 Yahan se mera naya code paste hoga
if (result.trim() === "Success") {

  window.location.href = "success.html";

} else if (result.trim() === "Already Registered") {

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Application";

  alert("This Instagram account is already registered.");

} else {

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Application";

  alert("Application submit failed.\n\nServer Response: " + result);

}

} catch (error) {

  console.error(error);

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Application";

  alert("Connection error.");

}
      });

}
    

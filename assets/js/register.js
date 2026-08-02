const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

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

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.text();

    if (result === "Success") {
      window.location.href = "success.html";
    } else {
      alert("Application submit failed.");
    }

  } catch (err) {
    console.error(err);
    alert("Connection error.");
  }
});

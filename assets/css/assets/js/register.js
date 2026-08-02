const form = document.querySelector("form");

if (form) {
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

    if (
      !data.name ||
      !data.instagram ||
      !data.followers ||
      !data.contact
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("JavaScript Connected Successfully!");
  });
}

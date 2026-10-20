const ADMIN_API_URL =
  "https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const loginForm = document.getElementById("loginForm");
const paymentForm = document.getElementById("paymentForm");

const loginMessage = document.getElementById("loginMessage");
const paymentMessage = document.getElementById("paymentMessage");
const tableMessage = document.getElementById("tableMessage");
const paymentsTable = document.getElementById("paymentsTable");

let adminToken = sessionStorage.getItem("vantaraAdminToken") || "";
let adminName = sessionStorage.getItem("vantaraAdminName") || "";

function showMessage(element, message, type = "") {
  element.textContent = message;
  element.className = "message" + (type ? " " + type : "");
}

async function postAdminData(data) {
  const response = await fetch(ADMIN_API_URL, {
    method: "POST",
    body: new URLSearchParams(data)
  });

  if (!response.ok) {
    throw new Error("Server request failed. Please try again.");
  }

  return response.json();
}

function showDashboard() {
  loginSection.hidden = true;
  dashboardSection.hidden = false;
  document.getElementById("welcomeText").textContent =
    "Logged in as " + (adminName || "Admin");
}

function showLogin() {
  adminToken = "";
  adminName = "";

  sessionStorage.removeItem("vantaraAdminToken");
  sessionStorage.removeItem("vantaraAdminName");

  dashboardSection.hidden = true;
  loginSection.hidden = false;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = value == null ? "" : String(value);
  row.appendChild(cell);
  return cell;
}

function addEmptyRow(message) {
  paymentsTable.replaceChildren();

  const row = document.createElement("tr");
  const cell = document.createElement("td");

  cell.colSpan = 8;
  cell.textContent = message;

  row.appendChild(cell);
  paymentsTable.appendChild(row);
}

async function loadPayments() {
  if (!adminToken) {
    showLogin();
    return;
  }

  showMessage(tableMessage, "Loading payments...");
  paymentsTable.replaceChildren();

  try {
    const url = new URL(ADMIN_API_URL);
    url.searchParams.set("action", "adminPayments");
    url.searchParams.set("adminToken", adminToken);

    const response = await fetch(url.toString());
    const result = await response.json();

    if (!result.success) {
      if (result.message && result.message.includes("Unauthorized")) {
        showLogin();
        showMessage(loginMessage, "Session expired. Please log in again.", "error");
        return;
      }

      throw new Error(result.message || "Could not load payments.");
    }

    const payments = Array.isArray(result.payments) ? result.payments : [];

    if (payments.length === 0) {
      addEmptyRow("No payment entries found.");
      showMessage(tableMessage, "No payment entries yet.");
      return;
    }

    paymentsTable.replaceChildren();

    payments.forEach((payment) => {
      const row = document.createElement("tr");

      addCell(row, payment.paymentId);
      addCell(row, payment.creatorId);
      addCell(row, payment.campaignName);
      addCell(row, Number(payment.views || 0).toLocaleString("en-IN"));
      addCell(row, "₹" + Number(payment.amount || 0).toLocaleString("en-IN"));

      const statusCell = addCell(row, payment.status || "Pending");
      statusCell.className =
        String(payment.status).toLowerCase() === "paid"
          ? "status-paid"
          : "status-pending";

      addCell(row, formatDate(payment.paymentDate));

      const updateCell = document.createElement("td");
      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "8px";
      controls.style.alignItems = "center";

      const select = document.createElement("select");
      select.setAttribute("aria-label", "Payment status");

      ["Pending", "Paid"].forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        select.appendChild(option);
      });

      select.value =
        String(payment.status).toLowerCase() === "paid" ? "Paid" : "Pending";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary-btn";
      button.textContent = "Save";

      button.addEventListener("click", async () => {
        if (!payment.paymentId) {
          showMessage(tableMessage, "Payment ID missing for this row.", "error");
          return;
        }

        if (!confirm("Update this payment status to " + select.value + "?")) {
          return;
        }

        button.disabled = true;

        try {
          const result = await postAdminData({
            action: "adminUpdatePayment",
            adminToken,
            paymentId: payment.paymentId,
            status: select.value
          });

          if (!result.success) {
            throw new Error(result.message || "Status update failed.");
          }

          showMessage(tableMessage, "Payment status updated.", "success");
          await loadPayments();
        } catch (error) {
          showMessage(tableMessage, error.message, "error");
          button.disabled = false;
        }
      });

      controls.appendChild(select);
      controls.appendChild(button);
      updateCell.appendChild(controls);
      row.appendChild(updateCell);

      paymentsTable.appendChild(row);
    });

    showMessage(tableMessage, payments.length + " payment entries loaded.", "success");
  } catch (error) {
    addEmptyRow("Unable to load payments.");
    showMessage(
      tableMessage,
      error.message + " If this is a connection error, check the Apps Script deployment.",
      "error"
    );
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = loginForm.querySelector("button[type='submit']");
  button.disabled = true;
  showMessage(loginMessage, "Checking login...");

  try {
    const result = await postAdminData({
      action: "adminLogin",
      email: document.getElementById("adminEmail").value.trim(),
      password: document.getElementById("adminPassword").value
    });

    if (!result.success || !result.adminToken) {
      throw new Error(result.message || "Login failed.");
    }

    adminToken = result.adminToken;
    adminName = result.adminName || "Admin";

    sessionStorage.setItem("vantaraAdminToken", adminToken);
    sessionStorage.setItem("vantaraAdminName", adminName);

    document.getElementById("adminPassword").value = "";
    showDashboard();
    await loadPayments();
  } catch (error) {
    showMessage(loginMessage, error.message, "error");
  } finally {
    button.disabled = false;
  }
});

paymentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = paymentForm.querySelector("button[type='submit']");
  button.disabled = true;
  showMessage(paymentMessage, "Saving payment...");

  try {
    const result = await postAdminData({
      action: "adminAddPayment",
      adminToken,
      creatorId: document.getElementById("creatorId").value.trim(),
      campaignName: document.getElementById("campaignName").value.trim(),
      views: document.getElementById("views").value,
      amount: document.getElementById("amount").value,
      status: document.getElementById("paymentStatus").value
    });

    if (!result.success) {
      throw new Error(result.message || "Could not add payment.");
    }

    showMessage(
      paymentMessage,
      "Payment added successfully. ID: " + result.paymentId,
      "success"
    );

    paymentForm.reset();
    await loadPayments();
  } catch (error) {
    showMessage(paymentMessage, error.message, "error");
  } finally {
    button.disabled = false;
  }
});

document.getElementById("refreshBtn").addEventListener("click", loadPayments);

document.getElementById("logoutBtn").addEventListener("click", () => {
  showLogin();
  showMessage(loginMessage, "You have been logged out.", "success");
});

if (adminToken) {
  showDashboard();
  loadPayments();
}

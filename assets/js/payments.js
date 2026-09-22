// ==============================
// Vantara Media Payments
// ==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";


// ==============================
// LOGIN SESSION
// ==============================

const creatorId =
localStorage.getItem("creatorId");

const creatorEmail =
localStorage.getItem("creatorEmail");


if (!creatorId || !creatorEmail) {

    window.location.href =
        "login.html";

}


// ==============================
// PAYMENT ELEMENTS
// ==============================

const totalEarnings =
document.getElementById("totalEarnings");

const paidAmount =
document.getElementById("paidAmount");

const pendingAmount =
document.getElementById("pendingAmount");

const totalPayments =
document.getElementById("totalPayments");

const paymentsTable =
document.getElementById("paymentsTable");


// ==============================
// LOAD PAYMENTS
// ==============================

async function loadPayments() {

    try {

        const response =
    await fetch(
        API_URL +
        "?action=payments&creatorId=" +
        encodeURIComponent(
            creatorId
        )
    );

alert("FETCH DONE");

const responseText =
    await response.text();

alert(responseText);


        // ==========================
        // EMPTY STATE
        // ==========================

        if (
            !Array.isArray(payments) ||
            payments.length === 0
        ) {

            totalEarnings.innerText =
                "₹0";

            paidAmount.innerText =
                "₹0";

            pendingAmount.innerText =
                "₹0";

            totalPayments.innerText =
                "0";

            paymentsTable.innerHTML = `

                <tr>

                    <td colspan="5">
                        No payment history yet.
                    </td>

                </tr>

            `;

            return;

        }


        // ==========================
        // CALCULATE TOTALS
        // ==========================

        let total = 0;

        let paid = 0;

        let pending = 0;


        payments.forEach(function(payment) {

            const amount =
                Number(payment.amount) || 0;


            total += amount;


            const status =
                String(
                    payment.status || ""
                )
                .trim()
                .toLowerCase();


            if (status === "paid") {

                paid += amount;

            }


            if (status === "pending") {

                pending += amount;

            }

        });


        totalEarnings.innerText =
            "₹" + total.toLocaleString("en-IN");


        paidAmount.innerText =
            "₹" + paid.toLocaleString("en-IN");


        pendingAmount.innerText =
            "₹" + pending.toLocaleString("en-IN");


        totalPayments.innerText =
            payments.length;


        // ==========================
        // PAYMENT TABLE
        // ==========================

        paymentsTable.innerHTML = "";


        payments.forEach(function(payment) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${
                        payment.paymentDate
                        ? new Date(
                            payment.paymentDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"
                    }
                </td>

                <td>
                    ${payment.campaignName || "-"}
                </td>

                <td>
                    ${
                        Number(payment.views || 0)
                        .toLocaleString("en-IN")
                    }
                </td>

                <td>
                    ₹${
                        Number(payment.amount || 0)
                        .toLocaleString("en-IN")
                    }
                </td>

                <td>
                    ${payment.status || "-"}
                </td>

            `;


            paymentsTable.appendChild(row);

        });

    }

    catch (error) {

        console.log(
            "Payment loading error:",
            error
        );

        paymentsTable.innerHTML = `

            <tr>

                <td colspan="5">
                    Unable to load payment history.
                </td>

            </tr>

        `;

    }

}


// ==============================
// START
// ==============================

loadPayments();

alert("PAYMENTS JS CONNECTED");

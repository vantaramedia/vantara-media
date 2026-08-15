// ==============================
// Vantara Media - Available Campaigns
// ==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const campaignsContainer =
document.getElementById("campaignsContainer");


// ==============================
// LOGIN CHECK
// ==============================

const creatorId =
localStorage.getItem("creatorId");

if (!creatorId) {

    alert("Please login first.");

    window.location.href = "login.html";

}


// ==============================
// LOAD CAMPAIGNS
// ==============================

async function loadCampaigns() {

    try {

        const response = await fetch(
            API_URL + "?action=campaigns"
        );

        const campaigns =
            await response.json();

        console.log("Campaigns:", campaigns);

        campaignsContainer.innerHTML = "";

        if (
            !campaigns ||
            campaigns.length === 0
        ) {

            campaignsContainer.innerHTML = `
                <div class="loading">
                    No active campaigns available right now.
                </div>
            `;

            return;

        }


        campaigns.forEach(function(campaign) {

            campaignsContainer.innerHTML += `

                <div class="campaign-card">

                    <h2>
                        ${campaign.campaign}
                    </h2>

                    <span class="campaign-platform">
                        ${campaign.platform}
                    </span>

                    <div class="campaign-info">

                        <div>
                            <small>Category</small>
                            <strong>
                                ${campaign.category}
                            </strong>
                        </div>

                        <div>
                            <small>Minimum Followers</small>
                            <strong>
                                ${campaign.followers}
                            </strong>
                        </div>

                        <div>
                            <small>Rate</small>
                            <strong>
                                ₹${campaign.rate}
                            </strong>
                        </div>

                        <div>
                            <small>Deadline</small>
                            <strong>
                                ${campaign.deadline}
                            </strong>
                        </div>

                    </div>

                    <p class="campaign-description">
                        ${campaign.description}
                    </p>

                    <button
                        class="apply-btn"
                        data-id="${campaign.id}"
                        data-name="${campaign.campaign}"
                        data-platform="${campaign.platform}"
                    >
                        Apply Now
                    </button>

                </div>

            `;

        });

    }

    catch(error) {

        console.log(
            "Campaign loading error:",
            error
        );

        campaignsContainer.innerHTML = `
            <div class="loading">
                Unable to load campaigns.
                Please try again later.
            </div>
        `;

    }

}


// ==============================
// APPLY CAMPAIGN
// ==============================

document.addEventListener(
    "click",
    async function(e) {

        if (
            !e.target.classList.contains(
                "apply-btn"
            )
        ) {

            return;

        }


        const button = e.target;

        const campaignId =
            button.dataset.id;

        const campaignName =
            button.dataset.name;

        const platform =
            button.dataset.platform;


        // --------------------------
        // CONFIRM APPLICATION
        // --------------------------

        const confirmed = confirm(

            "Apply for this campaign?\n\n" +

            "Campaign: " +
            campaignName +
            "\n" +

            "Platform: " +
            platform

        );


        if (!confirmed) {

            return;

        }


        // --------------------------
        // BUTTON STATE
        // --------------------------

        button.disabled = true;

        button.innerText =
            "Applying...";


        // --------------------------
        // FORM DATA
        // --------------------------

        const formData =
            new URLSearchParams();

        formData.append(
            "action",
            "apply"
        );

        formData.append(
            "creatorId",
            creatorId
        );

        formData.append(
            "campaignId",
            campaignId
        );

        formData.append(
            "campaignName",
            campaignName
        );

        formData.append(
            "platform",
            platform
        );


        // --------------------------
        // SEND APPLICATION
        // --------------------------

        try {

            const response =
                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body: formData

                });


            const result =
                (
                    await response.text()
                ).trim();


            console.log(
                "Application response:",
                result
            );


            // --------------------------
            // SUCCESS
            // --------------------------

            if (
                result === "Success"
            ) {

                alert(
                    "Application submitted successfully! ✅"
                );

                button.innerText =
                    "Applied ✓";

                button.style.background =
                    "#16a34a";

                return;

            }


            // --------------------------
            // DUPLICATE
            // --------------------------

            if (
                result ===
                "Already Applied"
            ) {

                alert(
                    "You have already applied for this campaign."
                );

                button.innerText =
                    "Already Applied";

                return;

            }


            // --------------------------
            // OTHER ERROR
            // --------------------------

            alert(result);

            button.disabled = false;

            button.innerText =
                "Apply Now";

        }

        catch(error) {

            console.log(
                "Application error:",
                error
            );

            alert(
                "Connection Error. Please try again."
            );

            button.disabled = false;

            button.innerText =
                "Apply Now";

        }

    }
);


// ==============================
// START
// ==============================

loadCampaigns();

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

        if (!campaigns || campaigns.length === 0) {

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

        console.log("Campaign loading error:", error);

        campaignsContainer.innerHTML = `
            <div class="loading">
                Unable to load campaigns.
                Please try again later.
            </div>
        `;

    }

}


// ==============================
// APPLY BUTTON
// ==============================

document.addEventListener("click", function(e) {

    if (
        e.target.classList.contains("apply-btn")
    ) {

        const campaignId =
        e.target.dataset.id;

        const campaignName =
        e.target.dataset.name;

        const platform =
        e.target.dataset.platform;

        alert(
            "Apply system next step me connect karenge.\n\n" +
            "Campaign: " + campaignName
        );

    }

});


// ==============================
// START
// ==============================

loadCampaigns();

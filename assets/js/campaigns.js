// ========================================
// Vantara Media - Campaigns Loader
// ========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec?action=campaigns";

const campaignContainer =
document.getElementById("campaignContainer");

async function loadCampaigns() {

    campaignContainer.innerHTML =
    "<p style='text-align:center'>Loading campaigns...</p>";

    try {

        const response = await fetch(API_URL);

        const campaigns = await response.json();

        campaignContainer.innerHTML = "";

        if (campaigns.length === 0) {

            campaignContainer.innerHTML =
            "<p style='text-align:center'>No Active Campaigns</p>";

            return;

        }

        campaigns.forEach(campaign => {

            campaignContainer.innerHTML += `
                        <div class="card">

                <div class="platform">${campaign.platform}</div>

                <h2>${campaign.campaign}</h2>

                <p>${campaign.description}</p>

                <p><strong>Category:</strong> ${campaign.category}</p>

                <p><strong>Minimum Followers:</strong> ${campaign.followers}</p>

                <p><strong>Rate:</strong> ₹${campaign.rate} / Million Views</p>

                <p><strong>Deadline:</strong> ${new Date(campaign.deadline).toLocaleDateString()}</p>

                <span class="status">${campaign.status}</span>

                <button>Apply Now</button>

            </div>
            `;

        });

    } catch (error) {

        campaignContainer.innerHTML =
        "<p style='text-align:center;color:red;'>Failed to load campaigns.</p>";

        console.error(error);

    }

}

loadCampaigns();

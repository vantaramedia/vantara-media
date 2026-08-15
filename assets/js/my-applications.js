// ==============================
// Vantara Media - My Applications
// ==============================

const API_URL =
"https://script.google.com/macros/s/AKfycbyyIuD77L0MDha73b8RUuWtmgejQ2836fvSEaWSUPx1doPrdjyZ8sbQo3iimwYjIgAd/exec";

const applicationsContainer =
document.getElementById("applicationsContainer");


// ==============================
// CREATOR LOGIN CHECK
// ==============================

const creatorId =
localStorage.getItem("creatorId");

if (!creatorId) {

    alert("Please login first.");

    window.location.href =
        "login.html";

}


// ==============================
// LOAD MY APPLICATIONS
// ==============================

async function loadApplications() {

    try {

        const response =
            await fetch(
                API_URL +
                "?action=myApplications&creatorId=" +
                encodeURIComponent(creatorId)
            );


        const applications =
            await response.json();


        console.log(
            "My Applications:",
            applications
        );


        applicationsContainer.innerHTML = "";


        // --------------------------
        // NO APPLICATIONS
        // --------------------------

        if (
            !applications ||
            applications.length === 0
        ) {

            applicationsContainer.innerHTML = `

                <div class="loading">

                    You haven't applied
                    to any campaigns yet.

                    <br><br>

                    <a
                        href="available-campaigns.html"
                        style="
                        color:#2563eb;
                        text-decoration:none;
                        font-weight:600;
                        "
                    >
                        Browse Available Campaigns →
                    </a>

                </div>

            `;

            return;

        }


        // --------------------------
        // APPLICATION CARDS
        // --------------------------

        applications.forEach(
            function(application) {


                let statusClass =
                    String(
                        application.status || ""
                    )
                    .toLowerCase();


                applicationsContainer.innerHTML += `

                    <div
                        class="application-card"
                    >

                        <h2>
                            ${application.campaignName}
                        </h2>


                        <span
                            class="application-platform"
                        >
                            ${application.platform}
                        </span>


                        <div
                            class="application-info"
                        >

                            <div>

                                <small>
                                    Application ID
                                </small>

                                <strong>
                                    ${application.applicationId}
                                </strong>

                            </div>


                            <div>

                                <small>
                                    Campaign ID
                                </small>

                                <strong>
                                    ${application.campaignId}
                                </strong>

                            </div>


                            <div>

                                <small>
                                    Apply Date
                                </small>

                                <strong>
                                    ${application.applyDate}
                                </strong>

                            </div>


                            <div>

                                <small>
                                    Status
                                </small>

                                <strong>
                                    ${application.status}
                                </strong>

                            </div>

                        </div>


                        <span
                            class="status ${statusClass}"
                        >
                            ${application.status}
                        </span>


                        ${
                            application.adminNote
                            ?
                            `
                            <p
                                style="
                                margin-top:15px;
                                font-size:13px;
                                color:#6b7280;
                                "
                            >
                                <strong>
                                    Admin Note:
                                </strong>

                                ${application.adminNote}

                            </p>
                            `
                            :
                            ""
                        }

                    </div>

                `;

            }
        );

    }


    catch(error) {

        console.log(
            "Applications error:",
            error
        );


        applicationsContainer.innerHTML = `

            <div class="loading">

                Unable to load applications.

                <br>

                Please try again later.

            </div>

        `;

    }

}


// ==============================
// START
// ==============================

loadApplications();

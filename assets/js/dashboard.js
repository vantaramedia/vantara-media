// =========================================
// Vantara Media Dashboard
// =========================================

// ---------- Search Creator ----------

const searchInput = document.getElementById("searchCreator");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(function(row){

            const text = row.innerText.toLowerCase();

            row.style.display = text.includes(filter) ? "" : "none";

        });

    });

}

// ---------- View Button ----------

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const row = button.closest("tr");

        const cells = row.querySelectorAll("td");

        document.getElementById("popupId").innerText = cells[0].innerText;
        document.getElementById("popupCreator").innerText = cells[1].innerText;
        document.getElementById("popupPlatform").innerText = cells[2].innerText;
        document.getElementById("popupFollowers").innerText = cells[3].innerText;
        document.getElementById("popupStatus").innerText = cells[4].innerText;

        document.getElementById("creatorModal").classList.add("show");

    });

});

// ---------- Close Popup ----------

const closePopup = document.getElementById("closeModal");

if(closePopup){

    closePopup.addEventListener("click", function(){

        document.getElementById("creatorModal").classList.remove("show");

    });

}

// ---------- Close Outside ----------

window.addEventListener("click", function(e){

    const modal = document.getElementById("creatorModal");

    if(e.target === modal){

        modal.classList.remove("show");

    }

});

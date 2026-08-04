// ===========================================
// Laundry Tracker V2
// Admin Panel
// ===========================================

import {
    loadLaundry,
    deleteLaundry
} from "./firebase.js";

const table = document.getElementById("adminTable");
const totalRecords = document.getElementById("totalRecords");
const todayEntries = document.getElementById("todayEntries");
const dbRecords = document.getElementById("dbRecords");

// ===========================================
// Load Dashboard
// ===========================================

async function loadDashboard() {

    const records = await loadLaundry();

    updateStatistics(records);

    loadTable(records);

}

// ===========================================
// Statistics
// ===========================================

function updateStatistics(records) {

    totalRecords.textContent = records.length;

    dbRecords.textContent = records.length;

    const today =
        new Date().toLocaleDateString();

    const todayCount =
        records.filter(r => r.date === today).length;

    todayEntries.textContent = todayCount;

}

// ===========================================
// Table
// ===========================================

function loadTable(records) {

    if (records.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                No Records Available
            </td>
        </tr>`;

        return;

    }

    table.innerHTML = "";

    records.forEach(record => {

        table.innerHTML += `

        <tr>

            <td>${record.date}</td>

            <td>${record.user || "Admin"}</td>

            <td>${record.total}</td>

            <td>

                <span class="status active">

                    Saved

                </span>

            </td>

            <td>

                <button
                    class="table-btn delete-btn"
                    data-id="${record.id}">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    bindDeleteButtons();

}

// ===========================================
// Delete
// ===========================================

function bindDeleteButtons() {

    document
    .querySelectorAll(".delete-btn")
    .forEach(button=>{

        button.addEventListener("click",async()=>{

            const id =
            button.dataset.id;

            if(!confirm("Delete this record?"))
                return;

            const ok =
            await deleteLaundry(id);

            if(ok){

                loadDashboard();

            }
            else{

                alert("Delete Failed");

            }

        });

    });

}

// ===========================================
// Search
// ===========================================

const searchInput =
document.querySelector(
".history-header input"
);

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const keyword =
searchInput.value.toLowerCase();

const rows =
document.querySelectorAll("#adminTable tr");

rows.forEach(row=>{

row.style.display=
row.innerText
.toLowerCase()
.includes(keyword)
?
""
:
"none";

});

});

}

// ===========================================
// Export PDF
// ===========================================

const pdfButton =
document.querySelectorAll(".action-btn")[1];

if(pdfButton){

pdfButton.addEventListener("click",()=>{

if(typeof downloadReport==="function"){

downloadReport();

}
else{

alert("PDF Module Missing");

}

});

}

// ===========================================
// Clear All Records
// ===========================================

const clearButton =
document.querySelectorAll(".action-btn")[3];

if(clearButton){

clearButton.addEventListener("click",()=>{

alert(
"This feature will be added in next version."
);

});

}

// ===========================================
// Logout
// ===========================================

const logout =
document.querySelector(".logout-btn");

if(logout){

logout.addEventListener("click",()=>{

sessionStorage.clear();

window.location.href=
"index.html";

});

}

// ===========================================
// Initialize
// ===========================================

loadDashboard();

console.log(
"Admin Panel Ready"
);

// =========================================
// FAMILY LAUNDRY MANAGEMENT SYSTEM
// script.js - Part 1
// =========================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ----------------------------
// Current User
// ----------------------------

const currentUser = localStorage.getItem("loggedInUser");

if (!currentUser) {
    window.location.href = "index.html";
}

// ----------------------------
// Welcome
// ----------------------------

const welcomeText = document.getElementById("welcomeText");

if (welcomeText) {
    welcomeText.textContent = `Welcome, ${currentUser}`;
}

// ----------------------------
// Logout
// ----------------------------

document
.getElementById("logoutBtn")
?.addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

});

// ----------------------------
// Form Elements
// ----------------------------

const form = document.getElementById("laundryForm");

const date = document.getElementById("date");

const shirts = document.getElementById("shirts");

const pants = document.getElementById("pants");

const inners = document.getElementById("inners");

const boxers = document.getElementById("boxers");

const towels = document.getElementById("towels");

const bedsheets = document.getElementById("bedsheets");

const liveTotal = document.getElementById("liveTotal");

// ----------------------------
// Today's Date
// ----------------------------

if (date) {

    date.value = new Date().toISOString().split("T")[0];

}

// ----------------------------
// Edit Mode
// ----------------------------

let editingId = null;

// ----------------------------
// Calculate Total
// ----------------------------

function calculateTotal() {

    return (

        Number(shirts.value || 0) +

        Number(pants.value || 0) +

        Number(inners.value || 0) +

        Number(boxers.value || 0) +

        Number(towels.value || 0) +

        Number(bedsheets.value || 0)

    );

}

function updateLiveTotal() {

    liveTotal.textContent = calculateTotal();

}

[
shirts,
pants,
inners,
boxers,
towels,
bedsheets

].forEach(input=>{

input.addEventListener("input",updateLiveTotal);

});
// =========================================
// SAVE / UPDATE LAUNDRY ENTRY
// =========================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const laundryData = {

        user: currentUser,

        date: date.value,

        shirts: Number(shirts.value),

        pants: Number(pants.value),

        inners: Number(inners.value),

        boxers: Number(boxers.value),

        towels: Number(towels.value),

        bedsheets: Number(bedsheets.value),

        total: calculateTotal(),

        createdAt: serverTimestamp()

    };

    if (laundryData.total === 0) {

        alert("Please enter at least one clothing item.");

        return;

    }

    try {

        if (editingId === null) {

            await addDoc(

                collection(db, "laundry"),

                laundryData

            );

            alert("Laundry Entry Saved Successfully.");

        }

        else {

            await updateDoc(

                doc(db, "laundry", editingId),

                {

                    user: laundryData.user,

                    date: laundryData.date,

                    shirts: laundryData.shirts,

                    pants: laundryData.pants,

                    inners: laundryData.inners,

                    boxers: laundryData.boxers,

                    towels: laundryData.towels,

                    bedsheets: laundryData.bedsheets,

                    total: laundryData.total

                }

            );

            alert("Laundry Entry Updated Successfully.");

            editingId = null;

            document.getElementById("saveBtn").innerHTML =

            '<i class="fa-solid fa-floppy-disk"></i> Save Entry';

        }

        form.reset();

        date.value = new Date().toISOString().split("T")[0];

        updateLiveTotal();

        loadHistory();

    }

    catch (error) {

        console.error(error);

        alert("Unable to save data.");

    }

});



// =========================================
// RESET FORM
// =========================================

function clearForm() {

    form.reset();

    date.value = new Date().toISOString().split("T")[0];

    editingId = null;

    updateLiveTotal();

    document.getElementById("saveBtn").innerHTML =

    '<i class="fa-solid fa-floppy-disk"></i> Save Entry';

}
// =========================================
// LOAD LAUNDRY HISTORY
// =========================================

async function loadHistory() {

    const historyTable = document.getElementById("historyTable");

    const totalEntries = document.getElementById("totalEntries");

    const totalClothes = document.getElementById("totalClothes");

    const lastEntry = document.getElementById("lastEntry");

    if (!historyTable) return;

    historyTable.innerHTML = "";

    let q;

    if (currentUser === "ADMIN") {

        q = query(
            collection(db, "laundry"),
            orderBy("date", "desc")
        );

    } else {

        q = query(
            collection(db, "laundry"),
            where("user", "==", currentUser),
            orderBy("date", "desc")
        );

    }

    const snapshot = await getDocs(q);

    let entryCount = 0;

    let clothCount = 0;

    let latestDate = "--";

    snapshot.forEach((document) => {

        const data = document.data();

        const id = document.id;

        entryCount++;

        clothCount += Number(data.total);

        if (latestDate === "--") {

            latestDate = data.date;

        }

        historyTable.innerHTML += `

<tr>

<td>${data.date}</td>

<td>${data.shirts}</td>

<td>${data.pants}</td>

<td>${data.inners}</td>

<td>${data.boxers}</td>

<td>${data.towels}</td>

<td>${data.bedsheets}</td>

<td>${data.total}</td>

<td>

<button
class="action-btn edit-btn"
onclick="editEntry('${id}')">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="action-btn delete-btn"
onclick="deleteEntry('${id}')">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

    });

    totalEntries.textContent = entryCount;

    totalClothes.textContent = clothCount;

    lastEntry.textContent = latestDate;

}



// =========================================
// LOAD WHEN PAGE OPENS
// =========================================

loadHistory();
// =========================================
// EDIT ENTRY
// =========================================

window.editEntry = async function (id) {

    try {

        const documentRef = doc(db, "laundry", id);

        const snapshot = await getDoc(documentRef);

        if (!snapshot.exists()) {

            alert("Laundry entry not found.");

            return;

        }

        const data = snapshot.data();

        editingId = id;

        date.value = data.date;

        shirts.value = data.shirts;

        pants.value = data.pants;

        inners.value = data.inners;

        boxers.value = data.boxers;

        towels.value = data.towels;

        bedsheets.value = data.bedsheets;

        updateLiveTotal();

        document.getElementById("saveBtn").innerHTML =
            '<i class="fa-solid fa-pen"></i> Update Entry';

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load laundry entry.");

    }

};



// =========================================
// DELETE ENTRY
// =========================================

window.deleteEntry = async function (id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this laundry entry?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "laundry", id)
        );

        alert("Laundry entry deleted successfully.");

        loadHistory();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete laundry entry.");

    }

};



// =========================================
// PDF BUTTON
// =========================================

const pdfButton = document.getElementById("downloadPdf");

if (pdfButton) {

    pdfButton.addEventListener("click", () => {

        if (typeof downloadLaundryPDF === "function") {

            downloadLaundryPDF();

        } else {

            alert("PDF module not loaded.");

        }

    });

}
// =========================================
// SCRIPT.JS - PART 5
// FINAL UTILITIES
// =========================================

// Auto Update Live Total on Page Load
updateLiveTotal();


// Highlight Current User
console.log("Logged in as:", currentUser);


// Sidebar PDF Button
const pdfMenu = document.getElementById("pdfMenu");

if (pdfMenu) {

    pdfMenu.addEventListener("click", () => {

        document.getElementById("downloadPdf").click();

    });

}


// Enter Key Support
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape" && editingId !== null) {

        clearForm();

    }

});


// Empty Table Message
async function checkEmptyTable() {

    const table = document.getElementById("historyTable");

    if (!table) return;

    if (table.children.length === 0) {

        table.innerHTML = `

<tr class="empty-row">

<td colspan="9">

No Laundry Records Found

</td>

</tr>

`;

    }

}


// Check for empty table after initial load
loadHistory().then(() => {
    checkEmptyTable();
});


// =========================================
// END OF SCRIPT.JS
// =========================================

console.log("Laundry Management System Loaded Successfully");

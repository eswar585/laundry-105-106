// ===============================================
// FAMILY LAUNDRY MANAGEMENT SYSTEM
// SCRIPT.JS - PART 1
// ===============================================

// Firebase Imports

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ===============================================
// CURRENT USER
// ===============================================

const currentUser = localStorage.getItem("loggedInUser");

// Redirect if not logged in

if (
    window.location.pathname.includes("dashboard.html") &&
    !currentUser
) {
    window.location.href = "index.html";
}

// ===============================================
// USER NAME
// ===============================================

let displayName = "";

switch (currentUser) {

    case "person1":
        displayName = "ESWAR";
        break;

    case "person2":
        displayName = "SNEHITH";
        break;

    case "person3":
        displayName = "SANTHOSH";
        break;

    case "person4":
        displayName = "DON";
        break;

    case "admin":
        displayName = "ADMIN";
        break;

    default:
        displayName = "Guest";

}

const welcome = document.getElementById("welcomeText");

if (welcome) {

    welcome.innerHTML = "Welcome, " + displayName;

}

// ===============================================
// LOGOUT
// ===============================================

window.logout = function () {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

};

// ===============================================
// FORM ELEMENTS
// ===============================================

const form = document.getElementById("laundryForm");

const date = document.getElementById("date");

const shirts = document.getElementById("shirts");

const pants = document.getElementById("pants");

const inners = document.getElementById("inners");

const boxers = document.getElementById("boxers");

const towels = document.getElementById("towels");

const bedsheets = document.getElementById("bedsheets");

// ===============================================
// TODAY'S DATE
// ===============================================

if (date) {

    date.value = new Date().toISOString().split("T")[0];

}

// ===============================================
// TOTAL CALCULATION
// ===============================================

function totalClothes() {

    return (

        Number(shirts?.value || 0) +

        Number(pants?.value || 0) +

        Number(inners?.value || 0) +

        Number(boxers?.value || 0) +

        Number(towels?.value || 0) +

        Number(bedsheets?.value || 0)

    );

}

// ===============================================
// UPDATE DASHBOARD CARD
// ===============================================

function updateLiveTotal() {

    const totalBox = document.getElementById("totalClothes");

    if (totalBox) {

        totalBox.innerHTML = totalClothes();

    }

}

// ===============================================
// LIVE INPUT EVENTS
// ===============================================

[
    shirts,
    pants,
    inners,
    boxers,
    towels,
    bedsheets

].forEach(input => {

    if (input) {

        input.addEventListener("input", updateLiveTotal);

    }

});

// ===============================================
// FUNCTIONS CONTINUE IN PART 2
// ===============================================
// ===============================================
// SCRIPT.JS - PART 2A
// SAVE DATA
// ===============================================

if (form) {

    form.addEventListener("submit", saveLaundry);

}

async function saveLaundry(e) {

    e.preventDefault();

    const laundry = {

        user: currentUser,

        date: date.value,

        shirts: Number(shirts.value) || 0,

        pants: Number(pants.value) || 0,

        inners: Number(inners.value) || 0,

        boxers: Number(boxers.value) || 0,

        towels: Number(towels.value) || 0,

        bedsheets: Number(bedsheets.value) || 0,

        total: totalClothes(),

        createdAt: serverTimestamp()

    };

    if (laundry.total <= 0) {

        alert("Enter at least one cloth.");

        return;

    }

    try {

        await addDoc(

            collection(db, "laundry"),

            laundry

        );

        alert("Laundry Saved Successfully");

        form.reset();

        date.value = new Date().toISOString().split("T")[0];

        updateLiveTotal();

        loadLaundryHistory();

    }

    catch (error) {

        console.error(error);

        alert("Unable to Save Data");

    }

}



// ===============================================
// LOAD HISTORY
// ===============================================

async function loadLaundryHistory() {

    const tbody = document.getElementById("historyTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    let q;

    if (currentUser === "admin") {

        q = query(

            collection(db, "laundry"),

            orderBy("createdAt", "desc")

        );

    }

    else {

        q = query(

            collection(db, "laundry"),

            where("user", "==", currentUser),

            orderBy("createdAt", "desc")

        );

    }

    const snapshot = await getDocs(q);

    let totalEntries = 0;

    let totalItems = 0;

    snapshot.forEach((document) => {

        const data = document.data();

        const docId = document.id;

        totalEntries++;

        totalItems += data.total;

        tbody.innerHTML += `
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
data-id="${docId}">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="action-btn delete-btn"
data-id="${docId}">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

    });
          // Update Dashboard Cards

        const totalEntriesBox = document.getElementById("totalEntries");

        if (totalEntriesBox) {

            totalEntriesBox.textContent = totalEntries;

        }

        const totalClothesBox = document.getElementById("totalClothes");

        if (totalClothesBox) {

            totalClothesBox.textContent = totalItems;

        }

    }

    catch (error) {

        console.error("Error loading history:", error);

    }

}



// ===============================================
// INITIAL LOAD
// ===============================================

if (window.location.pathname.includes("dashboard.html")) {

    loadLaundryHistory();

}



// ===============================================
// EDIT & DELETE BUTTONS
// (Actual functionality in Part 3)
// ===============================================

document.addEventListener("click", function (e) {

    const editBtn = e.target.closest(".edit-btn");

    const deleteBtn = e.target.closest(".delete-btn");

    if (editBtn) {

        const id = editBtn.dataset.id;

        editLaundry(id);

    }

    if (deleteBtn) {

        const id = deleteBtn.dataset.id;

        deleteLaundry(id);

    }

});



// ===============================================
// PLACEHOLDER FUNCTIONS
// (Will be completed in Part 3)
// ===============================================

function editLaundry(id) {

    console.log("Edit:", id);

}

function deleteLaundry(id) {

    console.log("Delete:", id);

}



// ===============================================
// END OF PART 2B
// ===============================================


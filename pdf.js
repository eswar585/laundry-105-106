// =========================================
// pdf.js
// FAMILY LAUNDRY MANAGEMENT SYSTEM
// =========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.downloadLaundryPDF = async function () {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const currentUser = localStorage.getItem("loggedInUser");

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

    pdf.setFontSize(18);
    pdf.text("Family Laundry Report", 14, 15);

    pdf.setFontSize(11);
    pdf.text("User : " + currentUser, 14, 24);

    pdf.text(
        "Generated : " + new Date().toLocaleString(),
        14,
        31
    );

    let y = 42;

    let totalEntries = 0;
    let totalClothes = 0;

    snapshot.forEach((doc) => {

        const d = doc.data();

        totalEntries++;
        totalClothes += Number(d.total);

        if (y > 270) {

            pdf.addPage();

            y = 20;

        }

        pdf.setFontSize(10);

        pdf.text(
            `${d.date}
 | Shirts:${d.shirts}
 | Pants:${d.pants}
 | Inners:${d.inners}
 | Boxers:${d.boxers}
 | Towels:${d.towels}
 | BedSheets:${d.bedsheets}
 | Total:${d.total}`,
            14,
            y
        );

        y += 10;

    });

    y += 8;

    pdf.setFontSize(12);

    pdf.text(
        "--------------------------------------------",
        14,
        y
    );

    y += 8;

    pdf.text(
        "Total Entries : " + totalEntries,
        14,
        y
    );

    y += 8;

    pdf.text(
        "Total Clothes : " + totalClothes,
        14,
        y
    );

    pdf.save(
        currentUser + "_Laundry_Report.pdf"
    );

};

// ============================================
// Laundry Tracker V2
// PDF Report Generator
// ============================================

function downloadReport() {

    const history =
        JSON.parse(localStorage.getItem("laundryHistory")) || [];

    if (history.length === 0) {

        alert("No records found.");

        return;

    }

    if (typeof window.jspdf === "undefined") {

        alert("jsPDF library not loaded.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("Laundry Tracker Report", 15, 20);

    doc.setFontSize(11);

    doc.text(
        "Generated : " + new Date().toLocaleString(),
        15,
        30
    );

    let y = 45;

    history.forEach((item, index) => {

        doc.setFont(undefined, "bold");

        doc.text(`Record ${index + 1}`, 15, y);

        y += 8;

        doc.setFont(undefined, "normal");

        doc.text("Date : " + item.date, 20, y);
        y += 7;

        doc.text("Pants : " + item.pants, 20, y);
        y += 7;

        doc.text("Shirts : " + item.shirts, 20, y);
        y += 7;

        doc.text("Boxers : " + item.boxers, 20, y);
        y += 7;

        doc.text("Inners : " + item.inners, 20, y);
        y += 7;

        doc.text("Towels : " + item.towels, 20, y);
        y += 7;

        doc.text("Bedsheets : " + item.bedsheets, 20, y);
        y += 7;

        doc.text("Total : " + item.total, 20, y);

        y += 15;

        if (y > 260) {

            doc.addPage();

            y = 20;

        }

    });

    doc.save("Laundry_Report.pdf");

}

console.log("PDF Module Loaded");

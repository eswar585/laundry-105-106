// =======================================
// Laundry Tracker V2 Dashboard
// =======================================

// Laundry Counts
const laundry = {
    pants: 0,
    shirts: 0,
    boxers: 0,
    inners: 0,
    towels: 0,
    bedsheets: 0
};

// Increase / Decrease
function changeCount(item, value) {

    laundry[item] += value;

    if (laundry[item] < 0)
        laundry[item] = 0;

    document.getElementById(item).innerText = laundry[item];

    updateTotal();

}

// Update Total
function updateTotal() {

    let total = 0;

    Object.values(laundry).forEach(num => {

        total += num;

    });

    document.getElementById("grandTotal").innerText = total;
    document.getElementById("todayTotal").innerText = total;
    document.getElementById("summaryItems").innerText = total;

}

// Save Entry
const saveBtn = document.querySelector(".save-entry");

if (saveBtn) {

    saveBtn.addEventListener("click", saveLaundry);

}

function saveLaundry() {

    const total = Object.values(laundry).reduce((a, b) => a + b, 0);

    if (total === 0) {

        alert("Please add laundry items.");

        return;

    }

    const today = new Date();

    const record = {

        date: today.toLocaleDateString(),

        pants: laundry.pants,

        shirts: laundry.shirts,

        boxers: laundry.boxers,

        inners: laundry.inners,

        towels: laundry.towels,

        bedsheets: laundry.bedsheets,

        total: total

    };

    let history = JSON.parse(localStorage.getItem("laundryHistory")) || [];

    history.unshift(record);

    localStorage.setItem("laundryHistory", JSON.stringify(history));

    document.querySelector(".summary-list strong:last-child").innerText =
        today.toLocaleTimeString();

    renderHistory();

    resetCounters();

    alert("Laundry Saved Successfully");

}

// Reset
function resetCounters() {

    Object.keys(laundry).forEach(key => {

        laundry[key] = 0;

        document.getElementById(key).innerText = 0;

    });

    updateTotal();

}

// Render Table
function renderHistory() {

    const tbody = document.getElementById("historyTable");

    if (!tbody) return;

    const history = JSON.parse(localStorage.getItem("laundryHistory")) || [];

    if (history.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="9" style="text-align:center;padding:40px;">
                No Laundry Records Yet
            </td>
        </tr>
        `;

        return;

    }

    tbody.innerHTML = "";

    history.forEach((item, index) => {

        tbody.innerHTML += `
        <tr>

            <td>${item.date}</td>

            <td>${item.pants}</td>

            <td>${item.shirts}</td>

            <td>${item.boxers}</td>

            <td>${item.inners}</td>

            <td>${item.towels}</td>

            <td>${item.bedsheets}</td>

            <td><strong>${item.total}</strong></td>

            <td>

                <button
                    onclick="deleteRecord(${index})"
                    style="
                    background:#ef4444;
                    color:white;
                    border:none;
                    padding:8px 14px;
                    border-radius:8px;
                    cursor:pointer;">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// Delete
function deleteRecord(index) {

    if (!confirm("Delete this record?")) return;

    let history = JSON.parse(localStorage.getItem("laundryHistory")) || [];

    history.splice(index, 1);

    localStorage.setItem("laundryHistory", JSON.stringify(history));

    renderHistory();

}

// Weather Demo
const weatherConditions = [

    {
        temp: "31°C",
        text: "Sunny",
        icon: "☀️"
    },

    {
        temp: "29°C",
        text: "Cloudy",
        icon: "☁️"
    },

    {
        temp: "27°C",
        text: "Rain",
        icon: "🌧️"
    }

];

let weatherIndex = 0;

function rotateWeather() {

    const weather = weatherConditions[weatherIndex];

    document.getElementById("temperature").innerText = weather.temp;

    document.getElementById("weatherCondition").innerText = weather.text;

    document.querySelector(".weather-icon").innerText = weather.icon;

    weatherIndex++;

    if (weatherIndex >= weatherConditions.length)
        weatherIndex = 0;

}

setInterval(rotateWeather, 5000);

// Dashboard Animation
document.querySelectorAll(".card").forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";

    setTimeout(() => {

        card.style.transition = ".5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0px)";

    }, index * 120);

});

// Initialize
renderHistory();

updateTotal();

console.log("Laundry Tracker Dashboard Loaded");

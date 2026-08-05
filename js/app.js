// ==========================================
// Laundry Tracker V3
// app.js - Part 1
// ==========================================

// Users
const USERS = [
    {
        username: "eswar",
        pin: "2000",
        name: "Eswar"
    },
    {
        username: "kavitha",
        pin: "1290",
        name: "Kavitha"
    },
    {
        username: "snehith",
        pin: "2001",
        name: "Snehith"
    }
];

// Elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const pinInput = document.getElementById("pin");
const rememberCheck = document.getElementById("rememberMe");

// ==========================================
// Remember Me
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    const savedUser = localStorage.getItem("rememberUser");

    if (savedUser) {

        usernameInput.value = savedUser;
        rememberCheck.checked = true;

    }

});

// ==========================================
// Login
// ==========================================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username =
        usernameInput.value.trim().toLowerCase();

    const pin =
        pinInput.value.trim();

    const user =
        USERS.find(u =>
            u.username === username &&
            u.pin === pin
        );

    if (!user) {

        showToast(
            "Invalid Username or PIN",
            "#EF4444"
        );

        pinInput.value = "";

        pinInput.focus();

        return;

    }

    // Remember User

    if (rememberCheck.checked) {

        localStorage.setItem(
            "rememberUser",
            user.username
        );

    } else {

        localStorage.removeItem(
            "rememberUser"
        );

    }

    // Save Session

    sessionStorage.setItem(
        "loggedIn",
        "true"
    );

    sessionStorage.setItem(
        "username",
        user.username
    );

    sessionStorage.setItem(
        "displayName",
        user.name
    );

    showToast(
        "Login Successful",
        "#22C55E"
    );

    setTimeout(() => {

        window.location.href =
            "dashboard.html";

    }, 1200);

});
// ==========================================
// Laundry Tracker V3
// app.js - Part 2
// ==========================================

// ==========================================
// Toast
// ==========================================

function showToast(message, color = "#22C55E") {

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastMessage");

    if (!toast || !text) return;

    text.innerText = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ==========================================
// Auto Login
// ==========================================

window.addEventListener("load", () => {

    const logged =
        sessionStorage.getItem("loggedIn");

    if (
        logged === "true" &&
        !window.location.pathname.includes("index.html")
    ) {
        return;
    }

});

// ==========================================
// Logout
// ==========================================

function logout() {

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("displayName");

    window.location.href = "index.html";

}

window.logout = logout;

// ==========================================
// PIN Validation
// ==========================================

pinInput.addEventListener("input", () => {

    pinInput.value =
        pinInput.value
            .replace(/\D/g, "")
            .slice(0, 4);

});

// ==========================================
// Username Formatting
// ==========================================

usernameInput.addEventListener("input", () => {

    usernameInput.value =
        usernameInput.value
            .replace(/\s+/g, "")
            .toLowerCase();

});

// ==========================================
// Card Animation
// ==========================================

const loginCard =
    document.querySelector(".login-card");

if (loginCard) {

    loginCard.animate(

        [
            {
                opacity: 0,
                transform: "translateY(30px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],

        {
            duration: 700,
            easing: "ease-out"
        }

    );

}

// ==========================================
// Auto Focus
// ==========================================

window.addEventListener("load", () => {

    usernameInput.focus();

});

// ==========================================
// Enter Key
// ==========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        if (
            document.activeElement === usernameInput
        ) {

            pinInput.focus();

        }

    }

});

// ==========================================
// Connection Status
// ==========================================

window.addEventListener("online", () => {

    showToast(
        "Internet Connected",
        "#22C55E"
    );

});

window.addEventListener("offline", () => {

    showToast(
        "No Internet Connection",
        "#EF4444"
    );

});

// ==========================================
// Prevent Back After Login
// ==========================================

history.pushState(null, null, location.href);

window.onpopstate = function () {

    history.go(1);

};

// ==========================================
// App Ready
// ==========================================

console.log("✅ Laundry Tracker V3 Loaded");

// ===========================================
// Laundry Tracker V2
// Authentication
// ===========================================

// Demo Login Credentials
const LOGIN_USERNAME = "admin";
const LOGIN_PIN = "1234";

// ----------------------------
// Login
// ----------------------------

function login(username, pin) {

    if (username === LOGIN_USERNAME && pin === LOGIN_PIN) {

        sessionStorage.setItem("laundryLoggedIn", "true");

        sessionStorage.setItem("laundryUser", username);

        window.location.href = "dashboard.html";

        return true;

    }

    return false;

}

// ----------------------------
// Logout
// ----------------------------

function logout() {

    if (!confirm("Logout from Laundry Tracker?"))
        return;

    sessionStorage.removeItem("laundryLoggedIn");

    sessionStorage.removeItem("laundryUser");

    window.location.href = "index.html";

}

// ----------------------------
// Protect Dashboard
// ----------------------------

function protectPage() {

    if (!window.location.pathname.includes("dashboard"))
        return;

    const loggedIn =
        sessionStorage.getItem("laundryLoggedIn");

    if (loggedIn !== "true") {

        window.location.href = "index.html";

    }

}

// ----------------------------
// Current User
// ----------------------------

function getCurrentUser() {

    return sessionStorage.getItem("laundryUser") || "Guest";

}

// ----------------------------
// Welcome Text
// ----------------------------

function updateWelcome() {

    const heading =
        document.querySelector(".topbar h1");

    if (!heading) return;

    heading.innerHTML =
        `Welcome Back 👋`;

    const subtitle =
        document.querySelector(".topbar p");

    if (subtitle) {

        subtitle.innerHTML =
        getCurrentUser();

    }

}

// ----------------------------
// Logout Button
// ----------------------------

window.addEventListener("load", () => {

    protectPage();

    updateWelcome();

    const logoutButton =
        document.querySelector(".logout-btn");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }

});

console.log("Authentication Ready");

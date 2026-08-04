// =========================================
// Laundry Tracker V2
// app.js
// =========================================

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const pin = document.getElementById("pin");
const weatherText = document.getElementById("weatherText");

// Demo Credentials
const USERNAME = "admin";
const PIN = "1234";

// Login
if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const user = username.value.trim();
        const pass = pin.value.trim();

        if (user === USERNAME && pass === PIN) {

            loginSuccess();

        } else {

            loginFailed();

        }

    });

}

// Login Success
function loginSuccess() {

    sessionStorage.setItem("laundryLoggedIn","true");

    sessionStorage.setItem("laundryUser",username.value);

    window.location.href="dashboard.html";

}

// Login Failed
function loginFailed() {

    pin.style.borderColor = "#ef4444";

    username.style.borderColor = "#ef4444";

    shakeCard();

    alert("Invalid Username or PIN");

    setTimeout(() => {

        pin.style.borderColor = "#334155";
        username.style.borderColor = "#334155";

    }, 1200);

}

// Shake Animation
function shakeCard() {

    const card = document.querySelector(".login-card");

    card.animate(

        [

            { transform: "translateX(0px)" },

            { transform: "translateX(-10px)" },

            { transform: "translateX(10px)" },

            { transform: "translateX(-8px)" },

            { transform: "translateX(8px)" },

            { transform: "translateX(0px)" }

        ],

        {

            duration: 450

        }

    );

}

// Weather Demo
const weatherList = [

    "☀ Sunny • 31°C",

    "⛅ Cloudy • 29°C",

    "🌧 Rain Expected • 27°C",

    "🌤 Pleasant • 30°C"

];

let weatherIndex = 0;

function rotateWeather() {

    if (!weatherText) return;

    weatherText.style.opacity = 0;

    setTimeout(() => {

        weatherText.innerHTML = weatherList[weatherIndex];

        weatherText.style.opacity = 1;

        weatherIndex++;

        if (weatherIndex >= weatherList.length) {

            weatherIndex = 0;

        }

    }, 300);

}

rotateWeather();

setInterval(rotateWeather, 4000);

// Input Animation
document.querySelectorAll("input").forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.style.transform = "scale(1.02)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.transform = "scale(1)";

    });

});

// Floating Effect
const logo = document.querySelector(".logo");

if (logo) {

    let direction = 1;

    setInterval(() => {

        logo.style.transform = `translateY(${direction * 6}px)`;

        direction *= -1;

    }, 1500);

}

// Console Message
console.log("%cLaundry Tracker V2 Loaded Successfully", "color:#7C3AED;font-size:16px;font-weight:bold;");

// ===========================================
// Laundry Tracker V2
// Charts
// ===========================================

const chartCanvas = document.getElementById("laundryChart");

function loadChart() {

    if (!chartCanvas) return;

    const history =
        JSON.parse(localStorage.getItem("laundryHistory")) || [];

    const labels = [];
    const totals = [];

    history.reverse().forEach(item => {

        labels.push(item.date);

        totals.push(item.total);

    });

    new Chart(chartCanvas, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Laundry Items",

                data: totals,

                borderWidth: 3,

                fill: true,

                borderColor: "#7C3AED",

                backgroundColor: "rgba(124,58,237,.15)",

                tension: .35

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "#ffffff"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#CBD5E1"

                    },

                    grid: {

                        color: "#334155"

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#CBD5E1"

                    },

                    grid: {

                        color: "#334155"

                    }

                }

            }

        }

    });

}

window.addEventListener("load", loadChart);

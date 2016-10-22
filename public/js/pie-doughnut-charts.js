var ctxPie = document.getElementById("pieChart");
var ctxDoughnut = document.getElementById("doughnutChart");
var data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }]
};
// For a pie chart
var myPieChart = new Chart(ctxPie, {
    type: 'pie',
    data: data,
    options: {
        responsive: true
    }
});
// And for a doughnut chart
var myDoughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    animation: {
        animateScale: true
    },
    data: data,
    options: {
        responsive: true
    }
});
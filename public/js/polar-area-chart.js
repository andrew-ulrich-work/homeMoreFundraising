var ctx = document.getElementById("polarArea");
var data = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
        label: 'My dataset' // for legend
    }],
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
};
var myChart = new Chart(ctx, {
    data: data,
    type: 'polarArea',
    options: {
        responsive: true,
        elements: {
            arc: {
                borderColor: "#000000"
            }
        }
    }
});
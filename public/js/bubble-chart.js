var ctx = document.getElementById("bubbleChart");
var data = {
    datasets: [{
        label: 'First Dataset',
        data: [{
            x: 20,
            y: 30,
            r: 15
        }, {
            x: 40,
            y: 10,
            r: 10
        },{
            x: 30,
            y: 28,
            r: 15
        }],
        backgroundColor: "#FF6384",
        hoverBackgroundColor: "#FF6384",
        scaleOverride:true,
                scaleSteps:9,
    }]
};
// For a bubble chart
var myBubbleChart = new Chart(ctx, {
    type: 'bubble',
    data: data,
    options: {
        responsive: false,
        elements: {
            points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
            }
        },
    }
});
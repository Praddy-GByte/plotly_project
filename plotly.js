
// Function to generate random data
function rand() {
    return Math.random();
}

// Create an array of Plotly plot objects
var plots = [
    { id: 'graph1', data: [1, 2, 3].map(rand) },
    { id: 'graph2', data: [1, 2, 3].map(rand) },
    { id: 'graph3', data: [1, 2, 3].map(rand) },
    { id: 'graph4', data: [1, 2, 3].map(rand) }
];

var isStreaming = [true, true, true, true]; // Flags to control streaming for each plot
var intervals = [null, null, null, null]; // Interval IDs for each plot

// Initialize each plot with random data
plots.forEach(function (plot) {
    Plotly.newPlot(plot.id, [{
        y: plot.data
    }]);
});
// Update the selected plot with random data
function updatePlot(plotIndex) {
    if (isStreaming[plotIndex]) {
        Plotly.extendTraces(plots[plotIndex].id, {
            y: [[rand()]]
        }, [0]);
    }
}

// Function to pause streaming for a specific plot
function pauseStreaming(plotIndex) {
    isStreaming[plotIndex] = false;
}

// Function to reset a specific plot
function resetPlot(plotIndex) {
    isStreaming[plotIndex] = true;

    // Clear existing plot
    Plotly.purge(plots[plotIndex].id);

    // Reinitialize the plot with random data
    Plotly.newPlot(plots[plotIndex].id, [{
        y: [1, 2, 3].map(rand)
    }]);
}

// Start streaming for all plots
for (var i = 0; i < plots.length; i++) {
    intervals[i] = setInterval(function (index) {
        updatePlot(index);
    }, 10, i);
}



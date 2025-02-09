
$(".chart-container").each(function (index) {
    const $container = $(this);

    // Create and append canvas
    const $canvas = $("<canvas></canvas>");
    $container.append($canvas);

    // Extract attributes
    const type = $container.data("type") || "line";
    const labels = ($container.data("labels") || "").split(",");
    const datasets = JSON.parse($container.attr("data-datasets")) || [];
    const title = $container.data("title") || `Graph ${index + 1}`;
    const xTitle = $container.data("x-title") || "";
    const yTitle = $container.data("y-title") || "";
    const xStepSize = parseFloat($container.data("x-step-size")) || null;
    const yStepSize = parseFloat($container.data("y-step-size")) || null;
    const xMin = parseFloat($container.data("x-min"));
    const xMax = parseFloat($container.data("x-max"));
    const yMin = parseFloat($container.data("y-min"));
    const yMax = parseFloat($container.data("y-max"));
    const annotations = JSON.parse($container.attr("data-annotations") || "[]");
    const showXAxis = $container.data("show-x-axis");
    const showYAxis = $container.data("show-y-axis");

    // Process annotations if present
    const annotationList = {};
    if (Array.isArray(annotations) && annotations.length > 0) {
        annotations.forEach((ann, annIndex) => {
            annotationList[`annotation-${index}-${annIndex}`] = {
                type: 'label',
                content: ann.content,
                xValue: ann.xValue,
                yValue: ann.yValue,
                backgroundColor: ann.backgroundColor || "rgba(0,0,0,0.25)",
                color: 'black',
                font: {
                    family: 'Times New Roman',
                    size: 12
                },
                position: {
                    x: 'center',
                    y: 'center'
                },
                yAdjust: ann.yAdjust || 0
            };
        });
    }
    // Extract tension value, or set default if not present
    let tension = parseFloat($(this).data("tension"));
    if (isNaN(tension) || tension < 0 || tension > 1) {
        tension = 0;  //Default tension
    }

    // Generate the chart
    new Chart($canvas[0], {
        type: type,
        data: {
            labels: labels,
            datasets: datasets.map(dataset => ({ ...dataset, tension: tension })) //Apply tension to each dataset

        },
        options: {
            responsive: false,
            maintainAspectRatio: false, // Allows setting height via CSS
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        family: "Times New Roman",
                        size: 16
                    }
                },
                legend: {
                    display: false // Disable legend entirely
                },
                tooltip: {
                    bodyFont: {
                        family: "Times New Roman"
                    }
                },
                annotation: {
                    // Configure annotations using the latest syntax
                    annotations: annotationList
                }
            },
            scales: {
                x: {
                    title: {
                        display: !!xTitle,
                        text: xTitle,
                        font: {
                            family: 'Times New Roman',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Times New Roman',
                            size: 12
                        },
                        stepSize: xStepSize // Apply custom step size for x-axis
                    },
                    min: xMin, // Set x-axis minimum value
                    max: xMax, // Set x-axis maximum value
                    display: showXAxis
                },
                y: {
                    title: {
                        display: !!yTitle,
                        text: yTitle,
                        font: {
                            family: 'Times New Roman',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Times New Roman',
                            size: 12
                        },
                        stepSize: yStepSize // Apply custom step size for y-axis
                    },
                    min: yMin, // Set y-axis minimum value
                    max: yMax, // Set y-axis maximum value
                    display: showYAxis
                }
            },
            onClick: (evt, activeElements) => {
                if (activeElements.length) {
                    const element = activeElements[0];
                    const index = element.index;
                    const datasetIndex = element.datasetIndex;
                    const dataset = datasets[datasetIndex];
                    const label = labels[index];
                    const value = dataset.data[index];
                    alert(`Label: ${label}, Value: ${value}`);
                }
            }
        }
    });
});
/**
 * A reusable class to handle both the velocity-time and acceleration-time graphs
 * for a given "question set". Allows multiple sets on the same page.
 */
class MotionGraphs {
    constructor($set) {
        // The parent container for this question set
        this.$set = $set;

        // Velocity chart
        this.$velocityContainer = $set.find('.velocity-container');
        this.$velocityCanvas = $set.find('.velocityChart');

        // Acceleration chart
        this.$accContainer = $set.find('.acceleration-container');
        this.$accCanvas = $set.find('.accelerationChart');

        // The "Check" button
        this.$checkBtn = $set.find('.check-btn');

        // Parsed data for velocity
        // data-datasets is expected to be an array of numeric velocity values
        this.velocityData = JSON.parse(this.$velocityContainer.attr('data-datasets') || '[]');

        // Parsed acceleration key
        // data-key is expected to be an array of {x, y} objects
        this.accKey = JSON.parse(this.$accContainer.attr('data-key') || '[]');

        // Y-axis configuration for velocity graph
        this.velYMin = parseFloat(this.$velocityContainer.attr('data-ymin') || 0);
        this.velYMax = parseFloat(this.$velocityContainer.attr('data-ymax') || 10);
        this.velStepSize = parseFloat(this.$velocityContainer.attr('data-stepsize') || 5);

        // Y-axis configuration for acceleration graph
        this.accYMin = parseFloat(this.$accContainer.attr('data-ymin') || -10);
        this.accYMax = parseFloat(this.$accContainer.attr('data-ymax') || 10);
        this.accStepSize = parseFloat(this.$accContainer.attr('data-stepsize') || 5);

        // Will store user clicks as an array of length 6 (for x=0..5) 
        // or we can store multiple clicks then map them to that array.
        this.accChartPoints = Array(6).fill(null);

        // We'll set up Chart.js instances
        this.velocityChart = null;
        this.accChart = null;
    }

    init() {
        this.initVelocityChart();
        this.initAccelerationChart();
        this.bindEvents();
    }

    /**
     * Initialize the velocity-time chart from the given "data-datasets".
     */
    initVelocityChart() {
        const ctx = this.$velocityCanvas[0].getContext('2d');

        // Generate a time label array [0, 1, 2, ...] based on data length
        const labels = this.velocityData.map((_, idx) => idx);

        this.velocityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Velocity',
                    data: this.velocityData,
                    borderColor: 'blue',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (s)'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Velocity (m/s)'
                        },
                        min: this.velYMin,
                        max: this.velYMax,
                        ticks: {
                            stepSize: this.velStepSize
                        }
                    }
                }
            }
        });
    }

    /**
     * Initialize the acceleration-time chart.
     * - Stepped line
     * - Dynamically sets the y-axis range based on the key ±1 buffer
     */
    initAccelerationChart() {
        const ctx = this.$accCanvas[0].getContext('2d');

        // We'll have labels from x=0..5
        const labels = [0, 1, 2, 3, 4, 5];

        this.accChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Acceleration',
                        data: [0, 0, 0, 0, 0, 0], // Start with all zero
                        borderColor: 'green',
                        borderWidth: 2,
                        fill: false,
                        stepped: true
                    }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (s)'
                        },
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Acceleration (m/s²)'
                        },
                        min: this.accYMin,
                        max: this.accYMax,
                        ticks: {
                            stepSize: this.accStepSize
                        }
                    }
                }
            }
        });
    }

    /**
     * Bind all event handlers, including clicks on the acceleration chart
     * and the "Check" button.
     */
    bindEvents() {
        // Handle clicks on the acceleration chart
        this.$accCanvas.on('click', (event) => {
            const chart = this.accChart;
            // Chart.js helper to convert mouse coords => chart coords
            const canvasPosition = Chart.helpers.getRelativePosition(event, chart);

            // Get the raw X, Y values in chart coordinate space
            const rawX = chart.scales.x.getValueForPixel(canvasPosition.x);
            const rawY = chart.scales.y.getValueForPixel(canvasPosition.y);

            // Snap to the nearest multiple of stepSize for x and y axis
            const xStep = chart.scales.x.options.ticks.stepSize;
            const yStep = chart.scales.y.options.ticks.stepSize;
            const xVal = Math.round(rawX / xStep) * xStep;
            const yVal = Math.round(rawY / yStep) * yStep;

            // Only record if x is between 0..5 inclusive
            if (xVal >= 0 && xVal <= 5) {
                this.accChartPoints[xVal] = yVal;
            }

            // Update the chart data
            chart.data.datasets[0].data = this.accChartPoints.map(val => val || 0);
            chart.update();
        });

        // Handle the "Check" button
        this.$checkBtn.on('click', () => {
            this.checkAcceleration();
        });

    }

    /**
     * Compare the user-plotted acceleration data with the key.
     * Provide feedback via alert.
     */
    checkAcceleration() {
        // The correct key is an array of objects: [ {x, y}, {x, y}, ... ]
        // For simplicity, assume x in the key goes from 0..(key.length-1).
        // We'll compare for each x in the key whether user data matches the key's y.

        console.log(JSON.stringify(this.accKey) + ":key ||| response:" + JSON.stringify(this.accChartPoints))
        if (!this.accKey.length) {
            alert('No key provided; cannot check.');
            return;
        }

        // Build an array of user values for the relevant x positions in the key
        // e.g. key might have x in [0..4]. We'll read the user's data from accChartPoints.
        const userPoints = this.accKey.map(k => {
            // if the user never clicked a certain x, the value might be null => treat as 0
            const userY = this.accChartPoints[k.x] != null ? this.accChartPoints[k.x] : 0;
            return { x: k.x, y: userY };
        });

        // Compare userPoints vs. accKey for each index
        let isCorrect = true;
        for (let i = 0; i < this.accKey.length; i++) {
            if (userPoints[i].y !== this.accKey[i].y) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            alert('Correct!');
            // Change 'Check' button to 'Correct' with green background and disable it
            this.$checkBtn.text('Correct').css({
                'background-color': 'green',
                'color': 'white'
            }).prop('disabled', true);
            // Disable further input on the acceleration chart
            this.$accCanvas.off('click');
        } else {
            alert('Incorrect, try again.');
        }

    }
}
class MotionGraphsAtoV {
    constructor($set) {
        // The parent container for this question set
        this.$set = $set;

        // Acceleration graph elements (given)
        this.$accContainer = $set.find('.acc-given-container');
        this.$accCanvas = $set.find('.accGivenChart');
        this.accKey = JSON.parse(this.$accContainer.attr('data-acc-key') || '[]');
        this.accYMin = parseFloat(this.$accContainer.attr('data-ymin')) || -10;
        this.accYMax = parseFloat(this.$accContainer.attr('data-ymax')) || 10;
        this.accStepSize = parseFloat(this.$accContainer.attr('data-stepsize')) || 5;
        this.annotationText = this.$accContainer.attr('data-annotation') || '';

        // Velocity graph elements (user plots)
        this.$velContainer = $set.find('.vel-plot-container');
        this.$velCanvas = $set.find('.velocityPlotChart');
        this.velKey = JSON.parse(this.$velContainer.attr('data-velocity-key') || '[]');
        this.velYMin = parseFloat(this.$velContainer.attr('data-ymin')) || 0;
        this.velYMax = parseFloat(this.$velContainer.attr('data-ymax')) || 20;
        this.velStepSize = parseFloat(this.$velContainer.attr('data-stepsize')) || 5;

        // "Check" button
        this.$checkBtn = $set.find('.check-btn-atoV');

        // Store user clicks for velocity at x=0..5 (or more, depending on max time)
        this.velChartPoints = Array(6).fill(null);

        // Chart.js instances
        this.accChart = null;
        this.velChart = null;
    }

    /**
     * Initialize both charts and bind event handlers
     */
    init() {
        this.initAccChart();
        this.initVelChart();
        this.bindEvents();
    }

    /**
     * Initialize the Acceleration–Time chart (given) with stepped data and an annotation.
     */
    initAccChart() {
        const ctx = this.$accCanvas[0].getContext('2d');

        // Sort the acceleration data by x
        const sortedData = [...this.accKey].sort((a, b) => a.x - b.x);
        const labels = sortedData.map(pt => pt.x);

        this.accChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Acceleration',
                        data: sortedData.map(pt => pt.y),
                        borderColor: 'green',
                        borderWidth: 2,
                        fill: false,
                        stepped: true
                    }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: {
                            note1: {
                                type: 'label',
                                content: this.annotationText,
                                position: {
                                    x: 'end',    // Positions the annotation at the end of the x-axis
                                    y: 'top'     // Positions the annotation towards the top of the y-axis
                                },
                                backgroundColor: 'rgba(177, 99, 255, 0.25)',
                                font: {
                                    family: 'Times New Roman',
                                    size: 14,
                                },
                                padding: 6,
                                align: 'left',        // Aligns the text to the left relative to the anchor point
                                anchor: 'start',      // Anchors the label at the start (left) side
                                xAdjust: -10,         // Slightly shifts the annotation left to prevent overlap
                                yAdjust: 10           // Slightly shifts the annotation down
                            }
                        }

                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (s)',
                            font: {
                                family: 'Times New Roman',
                                size: 14,
                            }
                        },
                        ticks: {
                            stepSize: 1  // Typically time is in integer steps
                        },
                        min: Math.min(...labels),
                        max: Math.max(...labels)
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Acceleration (m/s²)',
                            font: {
                                family: 'Times New Roman',
                                size: 14,
                            }
                        },
                        min: this.accYMin,
                        max: this.accYMax,
                        ticks: {
                            stepSize: this.accStepSize
                        }
                    }
                }
            }
        });
    }

    /**
     * Initialize the Velocity–Time chart, where the user will click to plot points.
     */
    initVelChart() {
        const ctx = this.$velCanvas[0].getContext('2d');

        // Determine max X from velKey or default to 5
        const maxX = this.velKey.length
            ? Math.max(...this.velKey.map(pt => pt.x))
            : 5;

        // Build labels from 0..maxX
        const labels = [];
        for (let i = 0; i <= maxX; i++) {
            labels.push(i);
        }

        // Start with all zeros
        const initialData = Array(labels.length).fill(0);

        this.velChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Velocity',
                        data: initialData,
                        borderColor: 'blue',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (s)',
                            font: {
                                family: 'Times New Roman',
                                size: 14,
                            }
                        },
                        // We usually consider integer time steps
                        ticks: {
                            stepSize: 1
                        },
                        min: 0,
                        max: maxX
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Velocity (m/s)',
                            font: {
                                family: 'Times New Roman',
                                size: 14,
                            }
                        },
                        min: this.velYMin,
                        max: this.velYMax,
                        ticks: {
                            stepSize: this.velStepSize
                        }
                    }
                }
            }
        });

        // Resize the user data array if we discovered a larger maxX
        if (maxX + 1 !== this.velChartPoints.length) {
            this.velChartPoints = Array(maxX + 1).fill(null);
        }
    }

    /**
     * Bind event handlers: user clicking on velocity chart + check button.
     */
    bindEvents() {
        // Clicking on velocity chart => store the velocity value at the nearest integer X
        this.$velCanvas.on('click', (e) => {
            const chart = this.velChart;
            const canvasPos = Chart.helpers.getRelativePosition(e, chart);
            const xScale = chart.scales.x;
            const yScale = chart.scales.y;

            // Convert pixel => chart axis values
            const rawX = xScale.getValueForPixel(canvasPos.x);
            const rawY = yScale.getValueForPixel(canvasPos.y);

            // Round x to the nearest integer step
            const xIndex = Math.round(rawX);

            // Snap y to the nearest multiple of velStepSize
            const snappedY = this.snapToStep(rawY, this.velStepSize);

            // Validate xIndex is within our array range
            if (xIndex >= 0 && xIndex < this.velChartPoints.length) {
                // Update the velocity point
                this.velChartPoints[xIndex] = snappedY;
                // Redraw
                this.updateVelocityChartData();
            }
        });

        // Handle the "Check" button
        this.$checkBtn.on('click', () => {
            this.checkVelocity();
        });
    }

    /**
     * Snap a value to the nearest multiple of 'step'.
     */
    snapToStep(value, step) {
        return Math.round(value / step) * step;
    }

    /**
     * Refresh the velocity chart data from this.velChartPoints.
     */
    updateVelocityChartData() {
        const updatedData = this.velChartPoints.map(val => (val !== null ? val : 0));
        this.velChart.data.datasets[0].data = updatedData;
        this.velChart.update();
    }

    /**
     * Compare user's velocity points with the correct velocity key.
     */
    checkVelocity() {
        if (!this.velKey.length) {
            alert('No velocity key provided; cannot check.');
            return;
        }

        // Build array of user values for each (x) in velKey
        const userPoints = this.velKey.map(k => {
            const userY = this.velChartPoints[k.x] !== null ? this.velChartPoints[k.x] : 0;
            return { x: k.x, y: userY };
        });

        // Compare userPoints with velKey
        console.log(JSON.stringify(userPoints) + ":key ||| response:" + JSON.stringify(this.velKey))

        const isCorrect = userPoints.every((pt, i) => pt.y === this.velKey[i].y);

        if (isCorrect) {
            alert('Correct!');
            // Change 'Check' button to 'Correct' with green background and disable it
            this.$checkBtn.text('Correct').css({
                'background-color': 'green',
                'color': 'white'
            }).prop('disabled', true);
            // Disable further input on the velocity chart
            this.$velocityCanvas.off('click');

        } else {
            alert('Incorrect, try again.');
        }
    }
}


$(document).ready(function () {
    // Initialize Velocity-to-Acceleration sets
    $('.motion-graphs-set').each(function () {
        const mg = new MotionGraphs($(this));
        mg.init();
    });

    // Initialize Acceleration-to-Velocity sets
    $('.motion-graphs-set-atoV').each(function () {
        const mgAtoV = new MotionGraphsAtoV($(this));
        mgAtoV.init();
    });
});

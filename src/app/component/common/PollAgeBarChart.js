import React from "react";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the required components for Chart.js
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels);

const PollAgeBarChart = ({ votes }) => {
    // Your data
    const ageGroups = ["16-20", "21-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"];

    // Chart data configuration
    const data = {
        labels: ageGroups, // X-axis labels
        datasets: [
            {
                label: "ভোট",
                data: votes, // Y-axis data
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED", "#A2EB36", "#A22B36",
                ], // Colors for each bar
                borderColor: "#ccc", // Border color for bars
                borderWidth: 1, // Border width
            },
        ],
    };

    // Chart options configuration
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                display: true, // Enable data labels
                color: "#000", // Label color
                font: {
                    size: 12, // Font size for labels
                },
                anchor: "end", // Position relative to the bar
                align: "top", // Position on top of the bar
                formatter: (value) => `${value} টি ভোট`, // Customize the label format
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "",
                },
                ticks: {
                    callback: function (value) {
                        return value?.toLocaleString(); // Format numbers with commas
                    },
                },
                type: "linear",
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: "400px", width: "1000px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PollAgeBarChart;

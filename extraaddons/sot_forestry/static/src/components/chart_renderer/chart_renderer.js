/** @odoo-module */

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
const { Component, onWillStart, useRef, onMounted } = owl;

export class ChartRenderer extends Component {
    setup() {
        this.chartRef = useRef("chart");
        onWillStart(async () => {
            await loadJS("/sot_forestry/static/src/components/chart_renderer/chart.min.js");
            await loadJS("/sot_forestry/static/src/components/chart_renderer/chartjs-plugin-datalabels.min.js");
        });

        onMounted(() => this.renderChart());
    }

    renderChart() {
        new Chart(this.chartRef.el, {
            type: 'pie',
            data: this.props.config.data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20, // Add space between legend items
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let data = tooltipItem.raw;
                                let total = tooltipItem.chart._metasets[0].total;
                                let percentage = (data / total * 100).toFixed(2);
                                return `${tooltipItem.label}: ${percentage}%`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: this.props.title,
                        position: 'top',
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value * 100 / sum).toFixed(2) + "%";
                            return percentage;
                        },
                        color: '#000',
                        anchor: 'end',
                        align: 'end',
                        offset: 10,
                        font: {
                            size: 12,
                        },
                        backgroundColor: '#fff', // Add background color to labels
                        borderRadius: 3,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        padding: {
                            top: 5,
                            bottom: 5,
                        },
                        textAlign: 'center',
                    }
                }
            },
            plugins: [ChartDataLabels],
        });
    }
}

ChartRenderer.template = "owl.ChartRenderer";

// Register the component
registry.category("components").add("ChartRenderer", ChartRenderer);

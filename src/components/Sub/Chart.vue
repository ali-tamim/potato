<template>
    <div>
        <canvas :id="id"></canvas>
    </div>
</template>
<style>
</style>
<script>
export default {
    name: 'Chart',
    props: ['id', 'chartData', 'from', 'to', 'format', 'his'],
    data: function () {
        return {
            chart: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{label: '', data: [], borderColor: ['#E040FB'], fill: false, borderWidth: 2}]
                },
                options: {
                    ali: this.to,
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali) + ' ' + value
                                },
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                padding: 20
                            },
                            time: {
                                unit: 'day'
                            },
                            gridLines: false
                        }]
                    }
                }
            },
            myChart: null
        }
    },
    mounted () {
        // eslint-disable-next-line
        this.createChart(this.id, this.chart)
        this.myChart.data.datasets.forEach((dataset) => {
            dataset.label = this.from + ' Price'
        })
    },
    watch: {
        chartData: function (newVal, oldVal) {
            this.updateChart()
        },
        to: function (newVal, oldVal) {
            this.chart.options.ali = newVal
        }
    },
    methods: {
        createChart: function (chartId, chartData) {
            const ctx = document.getElementById(chartId)
            // eslint-disable-next-line
            this.myChart = new Chart (ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            })
        },
        updateChart: function () {
            this.myChart.data.labels = []
            this.myChart.data.datasets.forEach((udataset) => {
                udataset.data = []
            })
            for (var i = 0; i < this.chartData.length; i++) {
                this.myChart.data.labels.push(this.$moment.unix(this.chartData[i].time).format(this.format))
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(this.chartData[i].close)
                })
            }
            if (this.his === 'year') {
                this.myChart.options = {
                    ali: this.to,
                    responsive: true,
                    devicePixelRatio: 1,
                    lineTension: 1,
                    legend: {
                        display: false
                    },
                    hover: {
                        mode: 'index'
                    },
                    layout: {
                    },
                    tooltips: {
                        enabled: false
                    },
                    elements: { point: { radius: 0 } },
                    scaleLabel: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali), value)
                                },
                                fontSize: 10
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                padding: 10
                            },
                            time: {
                                unit: 'day',
                                stepSize: 70
                            },
                            fontSize: 10,
                            gridLines: false
                        }]
                    }
                }
            } else if (this.his === 'month') {
                this.myChart.options = {
                    ali: this.to,
                    responsive: true,
                    devicePixelRatio: 1,
                    lineTension: 1,
                    hover: {
                        mode: 'index'
                    },
                    layout: {
                    },
                    tooltips: {
                        enabled: false
                    },
                    elements: { point: { radius: 0 } },
                    scaleLabel: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali), value)
                                },
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                padding: 20
                            },
                            time: {
                                unit: 'day',
                                stepSize: 5
                            },
                            gridLines: false
                        }]
                    }
                }
            } else if (this.his === 'week') {
                this.myChart.options = {
                    ali: this.to,
                    responsive: true,
                    devicePixelRatio: 1,
                    lineTension: 1,
                    hover: {
                        mode: 'index'
                    },
                    layout: {},
                    tooltips: {
                        enabled: false
                    },
                    elements: {point: {radius: 0}},
                    scaleLabel: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali), value)
                                },
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                padding: 20
                            },
                            time: {
                                unit: 'day',
                                stepSize: 1
                            },
                            gridLines: false
                        }]
                    }
                }
            } else if (this.his === 'day') {
                this.myChart.options = {
                    ali: this.to,
                    responsive: true,
                    devicePixelRatio: 1,
                    lineTension: 1,
                    hover: {
                        mode: 'index'
                    },
                    layout: {},
                    tooltips: {
                        enabled: false
                    },
                    elements: {point: {radius: 0}},
                    scaleLabel: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali), value)
                                },
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                padding: 20
                            },
                            gridLines: false
                        }]
                    }
                }
            } else if (this.his === 'hour') {
                this.myChart.options = {
                    ali: this.to,
                    responsive: true,
                    devicePixelRatio: 1,
                    lineTension: 1,
                    hover: {
                        mode: 'index'
                    },
                    layout: {},
                    tooltips: {
                        enabled: false
                    },
                    elements: {point: {radius: 0}},
                    scaleLabel: {
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    // eslint-disable-next-line
                                    return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.chart.options.ali), value)
                                },
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                padding: 20
                            },
                            gridLines: false
                        }]
                    }
                }
            }
            this.myChart.update()
        }
    }
}
</script>

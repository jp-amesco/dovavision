import React, { Component } from 'react' 
import ReactApexChart from 'react-apexcharts';

class AreaChart extends Component {
    constructor(props) {
        super(props);
        this.makeOptions = this.makeOptions.bind(this);
        this.makeSeries = this.makeSeries.bind(this);
    }

    makeOptions() {
        return {
            chart: {
                type: 'area',
                zoom: {
                    enabled: true
                },
                background: 'rgb(50, 50, 50)',
                colors: ['#fff']
            },
            dataLabels: {
                enabled: false,
                color: '#fff'
            },
            stroke: {
                curve: 'straight'
            },

            title: {
                text: this.props.title,
                align: 'left',
                style: {
                    color: '#fff'
                }
            },
            subtitle: {
                text: this.props.subtitle,
                align: 'left',
                style: {
                    color: '#fff'
                }
            },
            labels: this.props.data.label.reverse(),
            fill: {
                type: 'gradient',
                colors: [this.props.color],
                gradient: {
                    shadeIntensity: 0.1,
                    opacityFrom: 1,
                    opacityTo: 0.6,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                type: 'category',
                labels: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
            },
            yaxis: {
                opposite: true,
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            legend: {
                horizontalAlign: 'left'
            },
        };
    }

    makeSeries() {
        return [{
            name: this.props.stockName,
            data: this.props.data.timeSeries.reverse()
        }]
    }

    render () {
        return <ReactApexChart options={this.makeOptions()} series={this.makeSeries()} type="area" height={'100%'}/>
    }
}

export default AreaChart;

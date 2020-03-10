import React, { Component } from 'react' 
import formatDate from '../../helpers/formatDate';
import ReactApexChart from 'react-apexcharts';

class AreaChart extends Component {
    constructor(props) {
        super(props);
        this.makeOptions = this.makeOptions.bind(this);
        this.makeSeries = this.makeSeries.bind(this);
    }

    // componentDidMount() {
    //     this.setState({
    //         series: {
    //             name: "STOCK ABC",
    //             data: []
    //         }
    //     })
    // }

    formatData() {
        let priceDaily = {
            label: [],
            data: []
        };
        for (const date in this.props.timeSeries) {
            priceDaily.label.push(formatDate(new Date(date), true));
            priceDaily.data.push(parseFloat(this.props.timeSeries[date]['4. close']).toFixed(2));
        }
        return priceDaily;
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
                text: 'Fundamental Analysis of Stocks',
                align: 'left',
                style: {
                    color: '#fff'
                }
            },
            subtitle: {
                text: 'Price Movements',
                align: 'left',
                style: {
                    color: '#fff'
                }
            },
            labels: this.formatData().label.reverse(),
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
            data: this.formatData().data.reverse()
        }]
    }
    //     return {
    //         theme: "light2",
    //         zoomEnabled: true,
    //         exportEnabled: true,
    //         axisY: {
    //             includeZero: false,
    //             valueFormatString: "##.##"
    //         },
    //         height: 275,
    //         data: [{
    //             type: "area",
    //             yValueFormatString: "##.##",
    //             dataPoints: this.formatData()
    //         }]
    //     }

    render () {
        return <ReactApexChart options={this.makeOptions()} series={this.makeSeries()} type="area" height={'100%'}/>
    }
}

export default AreaChart;

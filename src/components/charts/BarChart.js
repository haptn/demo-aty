import React from 'react'
import Chart from "react-apexcharts"

function BarChart(props) {
  const { title, series, xAxis, yAxis, option } = props

  const getTitle = () => {
    switch (option) {
      case '':
        return 'Total Sales of Services (unit: billion VND)'    // just an example

      case '':
        return 'Quantity of Services (unit: service)'    // just an example

      default:
        return ''
    }
  }

  const state = {
    series,
    options: {
      chart: {
        height: 350,
        type: 'bar',
        offsetY: 10,
      },
      plotOptions: {
        bar: {
          // borderRadius: 2,
          columnWidth: '65%',
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return parseFloat(val).toFixed(0)
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: xAxis,
        position: 'bottom',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        // tooltip: {
        //     enabled: true,
        // }
      },
      yaxis: {
        min: yAxis?.min || 0,
        max: yAxis?.max || 150,
        tickAmount: yAxis?.tickAmount || 6,
        forceNiceScale: false,
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val
          }
        }
      },
      title: {
        text: title,
        floating: true,
        align: 'center',
        style: {
          color: '#444',
          fontWeight: 600,
          fontSize: 15,
        }
      }
    },
  }

  return <Chart {...state} type="bar" height={350} />
}

export default BarChart
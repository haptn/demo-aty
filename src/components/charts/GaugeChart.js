import React from 'react'
import Chart from "react-apexcharts"

function GaugeChart(props) {
  const { title, series, option } = props

  const state = {
    series,
    options: {
      chart: {
        height: 225,
        type: 'radialBar',
        // offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              // fontSize: '16px',
              color: undefined,
              // offsetY: 120
            },
            value: {
              // offsetY: 76,
              // fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          },
          // fill: {
          //   type: 'gradient',
          //   gradient: {
          //     shade: 'dark',
          //     shadeIntensity: 0.15,
          //     inverseColors: false,
          //     opacityFrom: 1,
          //     opacityTo: 1,
          //     stops: [0, 50, 65, 91]
          //   },
          // },
          // stroke: {
          //   dashArray: 4
          // },
        }
      },
      // dataLabels: {
      //   enabled: true,
      //   formatter: function (val) {
      //     return parseFloat(val).toFixed(0)
      //   },
      //   offsetY: -20,
      //   style: {
      //     fontSize: '12px',
      //     colors: ["#304758"]
      //   }
      // },
      // title: {
      //   text: title,
      //   floating: true,
      //   align: 'center',
      //   style: {
      //     color: '#444',
      //     fontWeight: 600,
      //     fontSize: 15,
      //   }
      // }
    },
  }

  return <Chart {...state} type="radialBar" height={225} />
}

export default GaugeChart
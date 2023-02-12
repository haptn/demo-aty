import React from 'react'
import Chart from 'react-apexcharts'

function PieChart(props) {
  const { title, values, labels } = props

  const state = {
    series: values,
    options: {
      chart: {
        type: 'donut',
        // dropShadow: {
        //   enabled: false,
        //   color: '#111',
        //   // blur: 3, // blur của cái box-shadow
        //   opacity: 0.05  // opacity của cái box-shadow
        // },
      },
      stroke: {
        width: 0.5,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                fontSize: '22px',
              }
            },
          }
        }
      },
      labels: labels,
      dataLabels: {
        dropShadow: {
          // blur: 3,
          opacity: 0.8
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        // offsetX: -20,
        // offsetY: 40,
      },
      // fill: {
      //   // type: 'pattern',
      //   opacity: 1,
      //   // pattern: {
      //   //     enabled: true,
      //   //     style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
      //   // },
      // },
      // states: {
      //   hover: {
      //     filter: 'none'
      //   }
      // },
      title: {
        text: title,
        whiteSpace: 'wrap',
        align: 'center',
        style: {
          color: '#444',
          fontWeight: 600,
          fontSize: 15,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  }

  return (
    <Chart {...{
      ...state,
      type: 'donut',
      height: 400,
      // width: '98%'
    }} />
  )
}

export default PieChart
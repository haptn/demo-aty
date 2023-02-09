import React from 'react'
import Chart from "react-apexcharts"

function StackBarChart(props) {
  const { values, years, option } = props

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
    // series: series,
    options: {
      chart: {
        height: 350,   // có cần ko nhỉ vì đã để ở <Chart/> rùi
        type: 'bar',   // có cần ko nhỉ vì đã để ở <Chart/> rùi
        stacked: true,
        toolbar: {
          show: true
        },
        // zoom: {
        //     enabled: true
        // }
      },
      // responsive: [{
      //     breakpoint: 480,
      //     options: {
      //         legend: {
      //             position: 'bottom',
      //             offsetX: -10,
      //             offsetY: 0
      //         }
      //     }
      // }],
      plotOptions: {
        bar: {
          borderRadius: 2,
          horizontal: false,
        },
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
      dataLabels: {
        enabled: true,
        formatter: labelFormatter,
      },
      title: {
        text: getTitle(),
        // style: {
        //     marginBottom: '0 !important',
        //     paddingBottom: '0 !important'
        // }
      },
      xaxis: { categories: years },
      yaxis: {
        labels: {
          formatter: labelFormatter,
        }
      },

      // Try to convert from column to bar
      // xaxis: {
      //     labels: {
      //         formatter: labelFormatter,
      //     }
      // },
      // yaxis: {
      //     categories: years
      // },
      legend: {
        position: 'right',
        offsetY: 40,
        fontSize: '14px'
      },
      fill: {
        opacity: 1
      }
    },
  }

  return (
    <div>
      <Chart {...state} series={values} type="bar" height={350} />
    </div>
  )
}

export default StackBarChart
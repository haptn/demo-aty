import React from 'react'
import Chart from "react-apexcharts"

function MixedStackChart(props) {
  const { title, isStack, yaxis, series, option } = props

  // const getTitle = () => {
  //   switch (option) {
  //     case '':
  //       return 'Total Sales of Services (unit: billion VND)'    // just an example

  //     case '':
  //       return 'Quantity of Services (unit: service)'    // just an example

  //     default:
  //       return ''
  //   }
  // }

  const state = {
    series,
    options: {
      chart: {
        height: 350,   // có cần ko nhỉ vì đã để ở <Chart/> rùi
        type: 'line',   // có cần ko nhỉ vì đã để ở <Chart/> rùi
        stacked: isStack,
      },
      colors: ['#008FFB', !!yaxis?.titles[1] ? '#00E396' : '#FF4560', '#FEB019'],
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
          columnWidth: '50%',
          // colors: {
          //   ranges: [{
          //     from: -100,
          //     to: -46,
          //     color: '#F15B46'
          //   }, {
          //     from: -45,
          //     to: 0,
          //     color: '#FEB019'
          //   }]
          // },
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 0, 4]
      },
      title: {
        text: title,
        offsetX: 75,
        floating: true,
        style: {
          color: '#444',
          fontWeight: 600,
          fontSize: 15,
        }
      },
      xaxis: {
        categories: ['2020', '2021', '2022', '2023'],
      },
      yaxis: [
        {
          seriesName: yaxis?.seriesNames[0],
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'    // 00E396
          },
          labels: {
            style: {
              colors: '#008FFB',    // 00E396
            }
          },
          title: {
            text: yaxis?.titles[0],
            style: {
              color: '#008FFB',   // 00E396
              fontWeight: 700,
              fontSize: 14
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          // seriesName: !!yaxis?.titles[1] ? yaxis?.seriesNames[1] : yaxis?.seriesNames[0],
          seriesName: yaxis?.seriesNames[0],
          opposite: true,
          show: !!yaxis?.titles[1],
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396',
            }
          },
          title: {
            text: yaxis?.titles[1],
            style: {
              color: '#00E396',
              fontWeight: 700,
              fontSize: 14
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: yaxis?.seriesNames[2],
          opposite: true,
          tickAmount: 4,
          // min: 0,
          // max: ,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019',
            }
          },
          title: {
            text: yaxis?.titles[2],
            style: {
              color: '#FEB019',
              fontWeight: 700,
              fontSize: 14
            }
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
    },
  }

  return (
    <div>
      <Chart {...state} type="line" height={350} />
    </div>
  )
}

export default MixedStackChart
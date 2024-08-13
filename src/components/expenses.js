import './expenses.css';

import React, { useEffect, useState} from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
import {
    BarChart,
    LineChart
  } from 'echarts/charts';

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
    CanvasRenderer,
// SVGRenderer,
} from 'echarts/renderers';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// Register the required components
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, CanvasRenderer]
  );

export default function Expenses({expensesTitle}) {

    const [showExpenses, setshowExpenses] = useState()

    async function getExpenses() {
        setshowExpenses({
            grid: { top: 8, right: 8, bottom: 24, left: 36 },
            xAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              axisLine: {
                lineStyle: {
                  type: 'dashed'
                  // ...
                }
              },
              axisTick: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: function (value) {
                    const val = Math.round(value/1000)
                    if(val === 0)
                        return val
                    return (val) + 'K'
                },
              }
            },
            
            series: [
              {
                data: [
                    2000, 
                    {
                        value: 10000,
                        // Specify the style for single bar
                        itemStyle: {
                            opacity: 0.5
                        }
                    }, 
                    8000, 
                    {
                        value: 4200,
                        // Specify the style for single bar
                        itemStyle: {
                            opacity: 0.5
                        }
                    }, 
                    3000, 
                    {
                        value: 7000,
                        // Specify the style for single bar
                        itemStyle: {
                            opacity: 0.5
                        }
                    }, 
                    8300, 
                    {
                        value: 2500,
                        // Specify the style for single bar
                        itemStyle: {
                            opacity: 0.5
                        }
                    }, 
                    9000, 
                    {
                        value: 10200,
                        // Specify the style for single bar
                        itemStyle: {
                            opacity: 0.5
                        }
                    }, 
                    11000],
                type: 'bar',
                barWidth: '45%',
                smooth: true,
                tooltip: {
                    trigger: 'item',
                    responsive: true,
                    position: 'top',
                    formatter: '${c}',
                    backgroundColor: '#2C2C2C',
                    borderColor: '#2C2C2C',
                    borderWidth: '0.8',
                    textStyle: {
                        color: '#FFFFFF'
                    }
                },
                itemStyle: {
                    barBorderRadius: 5,
                    borderWidth: 1,
                    color: 'rgb(2, 150, 166)'
                  }
              },
            ],
            tooltip: {
              trigger: 'axis',
            },
          })
    }

    useEffect(() => {
        getExpenses()
    },[])

    return (
        <div className='expenses'>
            <h4 className='sectionHeading' data-aue-prop="expensesTitle" data-aue-type="text">{expensesTitle}</h4>
            {
                showExpenses &&
                  <ReactEChartsCore 
                    echarts={echarts} 
                    notMerge={true}
                    lazyUpdate={true}
                    option={showExpenses} />
            }
        </div>
    )
}
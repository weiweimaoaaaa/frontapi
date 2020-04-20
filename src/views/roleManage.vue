<template>
  <div :id="id" :class="className" style="width: 700px;height: 400px;">

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null,
        date:'',
        timer:'',
        myChart1:'',
        datenumber:{
          coughnumber:[],
          diagnosisnumber:[],
          godoctoranddiagnosisNumber:[],
          godoctornumber:[],
          quarantinenumber:[],
          shortbreathnumber:[],
          suspectednumber:[],
        },
        start:'',
        end:'',
        week:[],
      }
    },
    watch: {
      //观察option的变化
      option: {
        handler(newVal, oldVal) {
          if (this.chart) {
            if (newVal) {
              this.chart.setOption(newVal);
            } else {
              this.chart.setOption(oldVal);
            }
          } else {
            this.init();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    created () {
      let data=[]
      this.start=this.getDay(-7);
      this.end=this.getDay(-1);
      for(let i=7;i>0;i--){
        data.push(this.getDay(-i))
      }
      this.week=data
    },
    mounted() {
      var aData = new Date();
      this.date = aData.getFullYear() + " " + (aData.getMonth() + 1) + " " + aData.getDate();
      this.$axios({
        method:'post',
        url:'/getEpidemicNumber',
        data: this.date,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
        },
      }).then(res=>{
        console.log(res)
        for(let i=0;i<res.data.result.length;i++)
        {
          this.datenumber.coughnumber[i]=res.data.result[i].coughNumber;
          this.datenumber.diagnosisnumber[i]=res.data.result[i].diagnosisNumber;
          this.datenumber.godoctoranddiagnosisNumber[i]=res.data.result[i].goDoctorAndDiagnosisNumber;
          this.datenumber.godoctornumber[i]=res.data.result[i].goDoctorNumber;
          this.datenumber.quarantinenumber[i]=res.data.result[i].quarantineNumber;
          this.datenumber.shortbreathnumber[i]=res.data.result[i].shortBreathNumberr;
          this.datenumber.suspectednumber[i]=res.data.result[i].suspectedNumber;
        }
        this.datenumber.coughnumber=[1,2,3,4,5,6,7]

        console.log(this.datenumber.coughnumber);
        this.$message({
          message: res.data.message,
          type: "success"
        })
      });
      this.timer=setInterval(()=> {
        this.initChart()
        console.log("wahaha")
        }
      ,1000)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    destroyed () {
      window.clearInterval(this.timer)
    },
    methods: {
      getDay(day){
        var today = new Date();
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = this.doHandleMonth(tMonth + 1);
        tDate =  this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      },
      doHandleMonth(month){
        var m = month;
        if(month.toString().length === 1){
          m = "0" + month;
        }
        return m;
      },
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))
        const xData = this.week
        this.option={
          backgroundColor: '#344b58',
          title: {
            text: 'statistics',
            x: '20',
            top: '20',
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            borderWidth: 0,
            top: 150,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '5%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['咳嗽人数', '气促人员', '就医人员']
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          dataZoom: [{
            show: true,
            height: 30,
            xAxisIndex: [
              0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5'
            },
            textStyle: {
              color: '#fff' },
            borderColor: '#90979c'
          }, {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }],
          series: [{
            name: '咳嗽人员',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: this.datenumber.coughnumber
          },
            {
              name: '气促人员',
              type: 'bar',
              stack: 'total',
              itemStyle: {
                normal: {
                  color: 'rgba(0,191,183,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data:  this.datenumber.coughnumber
            }, {
              name: '就医人员',
              type: 'line',
              stack: 'total',
              symbolSize: 10,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(252,230,48,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data:  this.datenumber.coughnumber
            },
          ]
        }
        this.chart.setOption(this.option)
      }
    }
  }
</script>

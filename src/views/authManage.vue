<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="myChart1" style="width: 600px;height: 400px;">
  <button @click="init()">折线图</button>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: '',
    data(){
      return{
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
        }
      }
    },
    watch:{
      datenumber(newVal,oldVal)
      {

      }
    },
    methods: {
      // 折线图
      getLine () {
        // 基于准备好的dom，初始化echarts实例
        this.myChart1 = echarts.init(document.getElementById('myChart1'));

        // 绘制图表，this.echarts1_option是数据

        this.myChart1.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            y: 'bottom',
            x: 'center',
            data:['A','B','C']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五','周六', '周日']
           },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'A',
            type:'line',
            stack: '总量',
            data: this.datenumber.coughnumber
          },
          {
            name:'B',
            type:'line',
            stack: '总量',
            data:this.datenumber.diagnosisnumber
          },
          {
            name:'C',
            type:'line',
            stack: '总量',
            data: this.datenumber.godoctoranddiagnosisNumber
          }
        ]
      })
      },
      init(){
        this.$nextTick(()=>{
          this.getLine('myChart1')
        })
      },
      getdata(){
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
          this.datenumber.coughnumber[6]=2;
          console.log(this.datenumber.coughnumber);
          this.$message({
            message: res.data.message,
            type: "success"
          })
        });
      },

    },
    created () {
      var aData = new Date();
      this.date = aData.getFullYear() + " " + (aData.getMonth() + 1) + " " + aData.getDate();
    },
    //调用
    mounted() {
      this.getdata();
    },
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

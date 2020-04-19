<template>
  <div id="menuManage">
    <body id="poster">
    <el-form v-for="(item,index)  in form" :model="item" :key="index" label-width="80px" class="demo-ruleForm" style="background-color: darkkhaki">
      <el-form-item label="填报人id">
        <el-input v-model="item.userId"></el-input>
      </el-form-item>
      <el-form-item label="填报日期">
        <el-input readonly v-model="item.date"></el-input>
      </el-form-item>
      <el-form-item label="今日体温">
        <el-input v-model="item.temperature"></el-input>
      </el-form-item>
      <el-form-item label="是否咳嗽">
        <el-radio-group v-model="item.cough" size="medium">
          <el-radio border class="radiosize" label="是"></el-radio>
          <el-radio border class="radiosize" label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否就医">
        <el-radio-group v-model="item.goDoctor" size="medium">
          <el-radio border label="是"></el-radio>
          <el-radio border label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="item.goDoctor==='是'">
        <el-form-item label="就医医院">
          <el-input v-model="item.hospital"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="是否气促">
        <el-radio-group v-model="item.shortBreath" size="medium">
          <el-radio border  label="是"></el-radio>
          <el-radio border  label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隔离">
        <el-radio-group v-model="item.quarantine" size="medium">
          <el-radio border  label="是"></el-radio>
          <el-radio border  label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否疑似">
        <el-radio-group v-model="item.suspected" size="medium">
          <el-radio border  label="是"></el-radio>
          <el-radio border  label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否确诊">
        <el-radio-group v-model="item.diagnosis" size="medium">
          <el-radio border  label="是"></el-radio>
          <el-radio border  label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form style="width: 50%;position: center">
      <el-form-item style="width: 100%;margin-left: 330px;">
       <el-button type="primary" style="text-align: center;width: 20%;background: #505458" v-on:click="submit">提交</el-button>
       <el-button type="primary" style="text-align: center;width: 20%;background: #505458" v-on:click="add">增加人员</el-button>
      </el-form-item>
    </el-form>
    </body>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        form:[{
          hospital:'',
        }
        ],
        model:{
          date:'',
          name:'',
          hospital:'',
          userId:''
        },
        manList:[],
        suspected:'',
        diagnosis:'',
        goDoctor:'',
        labelPosition:'left',
        hospital:'',
          date:'',
          type: '家庭单位'
      };
    },

    computed:{
      count(){
        console.log(this.$store.state.user.username);
        return this.$store.state.user.username
      }
    },
    created: function() {

        this.form[0].userId=this.$store.state.user.idCard;
        var aData = new Date();
        this.form[0].date = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
        this.date=this.form[0].date;
        this.getmanList();



    },
    methods:{
       add(){

         this.manList.splice(0,1)
         console.log(this.manList)
         if(this.manList.length!==0) {
           this.model = {userId:this.manList[0].id, date: this.date, hospital: ''};
           this.form.push(this.model);
           this.manList.splice(0,1);
         }
         else
         {
           this.model = {userId:'', date: this.date, hospital: ''};
           this.form.push(this.model);
         }
       },
      async getmanList() {
        this.$axios({
          method:'post',
          url:'/getFamilyInfo',
          data: JSON.stringify(
            this.$store.state.user.idCard,
          ),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
          },
        }).then(res=> {
            console.log(res)
            if (res.data.result.length !== 0) {
              this.manList = res.data.result;
            }
            else
            {
              this.manList=[];
            }
          }
        ) .catch(err=>{

        })
      },
      submit(){
         console.log(this.form)
        this.$axios({
          method: 'post',
          url:"/registerHealthInfo",
          data:JSON.stringify(this.form),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
          },
        }).then(res=> {
            console.log(res);
            if(res.data.code===200) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            }
          }
        ).catch(err=>{

        })
      },
    },
  }
</script>

<style>
  .demo-ruleForm {

    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px auto;
    margin-left: 400px;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  #menuManage {
    background-position: center;
  }
  #poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
  }
</style>

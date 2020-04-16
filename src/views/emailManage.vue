<template>
  <div id="application">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3 class="login_title">社区出行卡</h3>
      <el-form-item label="身份证号" prop="idcard">
        <el-input v-model="ruleForm.idcard"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="申请日期" prop="date1">
        <el-input readonly v-model="ruleForm.date1" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="有效日期" prop="date2">
        <el-input readonly v-model="ruleForm.date2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-show="isbutton===true" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="check">查看申请信息</el-button>
      </el-form-item>
    </el-form>
  <el-dialog
    title="审核信息"
    :visible.sync="seeVisible"
    width="30%"
    :before-close="handleClose">
    <div style="border:1px solid #ddd;padding:20px;margin-bottom:20px">
      <el-row style="padding: 20px 0 20px 0;border-bottom:1px solid #ddd">
        <el-col :span="24">
          <span>经办人：</span>
        </el-col>
        <el-col :span="24">
          <span>{{digit.asignedinfo}}</span>
        </el-col>
      </el-row>

      <el-row style="padding: 20px 0 20px 0;border-bottom:1px solid #ddd">
        <el-col :span="24">
          <span>剩余出行次数：{{digit.count}}</span>
        </el-col>
      </el-row>

      <el-row style="padding: 20px 0 0 0">
        <el-col :span="24">
          <span>出行时间/次：{{digit.time}}</span>
        </el-col>
      </el-row>

      <el-row style="padding: 20px 0 0 0">
        <el-col :span="24">
          <span>审核意见：{{digit.comment}}</span>
        </el-col>
      </el-row>

      <el-row style="padding: 20px 0 0 0" v-if="digit.state!=null">
        <el-col :span="24">
          <span v-if="digit.state === '1'">审核：<el-button type="success">通过</el-button></span>
          <span v-if="digit.state === '0'">审核：<el-button type="danger">不通过</el-button></span>
          <span v-if="digit.state === '2'">审核：<el-button type="wait">等待审核</el-button></span>
        </el-col>
      </el-row>
    </div>

    <span slot="footer" class="see-footer">
            <el-button @click="seeVisible = false">取 消</el-button>
            <el-button type="primary" @click="seeVisible = false">确 定</el-button>
          </span>
  </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      seeVisible:false,
      ruleForm: {
        date1: '',
        date2: '',
        idcard: '',
        username:'',
      },
      isbutton:true,
      digit:{
        count:2,

        state:'',

      },

    }
  },
  created () {
    this.ruleForm.idcard=this.$store.state.user.idCard;
    this.ruleForm.username=this.$store.state.user.username;
    var aData = new Date();
    this.ruleForm.date1 = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
    this.ruleForm.date2=aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + (aData.getDate()+1)+" 00:00:00-23:59:59";
  },
  methods:{
    handleClose(done){
      done();
    },
    async submitForm(){
      this.digit.state='2';
     this.$axios({
        method:'post',
        url: "/convenienceCardApply",
       data:JSON.stringify({
         date1: this.ruleForm.date1,
         date2: this.ruleForm.date2,
         idCard: this.ruleForm.idcard,
         username: this.ruleForm.username,
       })
     }).then(res=>{
       this.$message({
         message: res.data.message,
         type: "success"
       });
     })
    },
    check(){
      this.seeVisible=true;
      this.$axios({
        method:'post',
        url: "/getApplyStatus",
        data:JSON.stringify({
          date1: this.ruleForm.date1,
          date2: this.ruleForm.date2,
          idCard: this.ruleForm.idcard,
          username: this.ruleForm.username,
        })
      }).then(res=>{
        this.$message({
          message: res.data.message,
          type: "success"
        });
      })
    }

  }
}
</script>

<style>
  .demo-ruleForm {
    position: fixed;
    border-radius: 15px;
    background-clip: padding-box;
    margin-left: 300px;
    width: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  #application{
    position: fixed;
  }
</style>

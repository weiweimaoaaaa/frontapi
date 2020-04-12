<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="demo-ruleForm">
    <el-form-item label="填报日期">
      <el-input readonly v-model="date"></el-input>
    </el-form-item>
    <el-form-item label="今日体温">
      <el-input v-model="formLabelAlign.region"></el-input>
    </el-form-item>
    <el-form-item label="是否咳嗽">
    <el-radio-group v-model="resource" size="medium">
      <el-radio border class="radiosize" label="是"></el-radio>
      <el-radio border class="radiosize" label="否"></el-radio>
    </el-radio-group>
    </el-form-item>
    <el-form-item label="是否气促">
      <el-radio-group v-model="resource2" size="medium">
        <el-radio border  label="是"></el-radio>
        <el-radio border  label="否"></el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name:'maninfo',
    data() {
      return {
        labelPosition:'left',
        resource:'',
        resource2:'',
        formLabelAlign: {
          date:'',
          name: '',
          region: '',
          type: '家庭单位'
        }
      };
    },
    created: function() {
      var aData = new Date();
      console.log(this.resource) //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)
      this.date = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      console.log(this.date);
    },
    methods:{
      aaa() {
        console.log(this.resource);
      }
    }


  }
</script>

<style scoped>
  .demo-ruleForm {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>

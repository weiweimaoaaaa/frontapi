<template>
  <div id="menuManage">
    <el-form label-width="80px" class="demo-ruleForm">
      <el-form-item label="填报人">
        <el-input v-model="count"></el-input>
      </el-form-item>
      <el-form-item label="填报日期">
        <el-input readonly v-model="date"></el-input>
      </el-form-item>
      <el-form-item label="今日体温">
        <el-input v-model="region"></el-input>
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
      <h1>{{this.$store.state.username}}</h1>
    </el-form>
    <el-form>

    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        form:[{}],
        labelPosition:'left',
        resource:'',
        resource2:'',
          date:'',
          region: '',
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
      var aData = new Date();
      this.date = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      console.log(this.date);
      console.log(this.$store.state.user.username);
    },
    methods:{
      aaa() {
        console.log(this.resource);
      }
    }


  }
</script>

<style>
  .demo-ruleForm {

    border-radius: 15px;
    background-clip: padding-box;
    margin: 20px auto;
    margin-left: 400px;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  #menuManage {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>

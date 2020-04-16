<template>
  <div>
  <el-steps :active="active" simple>
    <el-step :title="item.title" :icon="item.icon" @click.native ="stepClick(item.index)" v-for="item in stepData" :key ="item.index"></el-step>
  </el-steps>
  <el-row  class = "active0" v-show="active === 0" >
    <div class="stepone">
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
      </el-form>
      <el-button type="primary" style="top:500px" plain size="medium" @click="nextClick()">{{nextTile}}</el-button>
    </div>
  </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      active: 0, // 控制步骤条及填写条目的显示
      stepData: [{index: 0, title: '步骤1', icon: 'el-icon-edit'},
        {index: 1, title: '步骤2', icon: 'el-icon-edit'},
        {index: 2, title: '步骤3', icon: 'el-icon-edit'}],
        nextTile:'下一步',
       ruleForm: {
        date1: '',
        date2: '',
        idcard: '',
        username:'',
      },

    }

  },
  methods:{
// 步骤条点击事件（因为lement-ui步骤条本身不支持点击事件，所以需要@click.native，来调用原生方法）
    stepClick (val) {
      var _that = this;
      _that.active = val;

    },
    nextClick () {
      var _that= this;
      console.log(_that.active);
      if (_that.active < 3) {
        _that.active ++ ;
        if(_that.active===1)
        {
          setInterval(()=>{

          },60000)
        }
      } else {
        _that.active = 0;
      }
    },


  }

}
</script>

<style>
  .stepone{
    position: absolute;
  }
</style>

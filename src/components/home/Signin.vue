<template>
  <body id="poster">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <h3 class="login_title">用户注册</h3>
    <el-form-item label="身份证号" prop="idcard">
      <el-input v-model="ruleForm.idcard"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="comeback">返回</el-button>
    </el-form-item>
    <div>{{msg}}</div>
  </el-form>
  </body>
</template>

<script>
  export default {
    name: 'Signin',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空'));
        }
        setTimeout(() => {
          if (value.length===0) {
            callback(new Error('请输入身份证号'));
          } else {
            if (value.length !== 10) {
              callback(new Error('输入格式有误'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatename=(rule,value,callback)=>{
        if(value==='') {
          callback(new Error('用户名不能为空'));
        }else{
          callback();
        }


      }
      return {
        msg:'',
        ruleForm: {
          pass: '',
          checkPass: '',
          idcard: '',
          username:'',
        },

        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username:[
            { validator:validatename,   trigger:'blur' }
          ],

          idcard: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      add(){
        var _this=this;
        _this.form.push(this.ruleForm);
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log({    //这里是发送给后台的数据
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
            idcard: this.ruleForm.idcard
          });
          if (valid) {
            this.$axios({
              method:'post',
                url:'/signin',
                data:JSON.stringify({    //这里是发送给后台的数据
                  username: this.ruleForm.username,
                  password: this.ruleForm.pass,
                  idcard: this.ruleForm.idcard
                }),
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
                },
            }
            )
              .then(result=>{
                this.msg = result.data;
              })
              .catch(err=>{

              })
              } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      comeback(){
        this.$router.replace('/login')
      }


    }
  }
</script>

<style scoped>
  .demo-ruleForm {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 550px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  body{
    margin: 0px;
  }
</style>

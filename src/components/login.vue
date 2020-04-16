<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="login">登录</el-button>
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="signin">注册</el-button>
    </el-form-item>

  </el-form>
  </body>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        responseResult: []
      }
    },
    methods: {
      login () {
        var _this = this
        this.$axios
          .post('/login',{
            idCard:'412726199703047114',
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.result
              console.log(data)
              _this.$store.commit('login',data)
              console.log(_this.$store.state.user.idCard)
              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/aa' : path})
            }
            else
            {
              console.log(successResponse)
              if(successResponse.data.code===400) {
                this.$message(
                  {
                    message: '帐号或密码错误！',
                    type: 'warning',
                  }
                )
              }
            }
          })
          .catch(failResponse => {
            console.log(failResponse)

          })
      },
      signin(){
        this.$router.replace('/signin');
      }

    }
  }
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
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
  #poster {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
</style>

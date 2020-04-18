<template>
  <div id="form">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">便民出行卡申请</el-menu-item>
    </el-menu>
    <br />
    <el-table
      border
      style="width: 100%"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      @row-click="changefun">
      <el-table-column prop="id" label="身份证号" width="200px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px"></el-table-column>
      <el-table-column prop="date1" label="申请日期" width="200px"></el-table-column>
      <el-table-column prop="date2" label="有效期" width="200px"></el-table-column>
      <el-table-column label="查看申请状态" width="200" column-key="567">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-edit" size="mini" @click="watchstate(scope.row)">申请状态</el-button>
        </template>
      </el-table-column>
      <el-table-column label="选中申请人">
        <template slot-scope="scope">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" @select="changefun">
            <el-checkbox :label="scope.row.id">选中</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;margin-left: 450px">
      <el-button @click="submit()" style="position: center;color: burlywood;background: #505458">提交申请</el-button>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        checkAll: false,
        isIndeterminate: false,
        checkedCities: [],
        tableData: [],
        multipleSelection: [],
        checkedGameId: [],
        activeIndex2: "1",
        sendmessagesign:[],
        sendmessage:[],

      }
    },

    methods: {
      handleCheckAllChange (val) {
        this.checkedCities = val ? this.checkedGameId : []
        if(val)
        {
          this.sendmessagesign=this.tableData;
          this.sendmessage=[];
          for(let k=0;k<this.tableData.length;k++)
          {
            this.sendmessage.push({
                id:this.tableData[k].id,
                name:this.tableData[k].name,
                date1:this.tableData[k].date1,
                date2:this.tableData[k].date2,
              }
            )
          }
          console.log(this.sendmessage)
        }
        else
        {
          this.sendmessage=[];
          this.sendmessagesign=[];
        }


        this.isIndeterminate = false
      },
      changefun (row) {
      },
      handleCheckedCitiesChange (value) {
        console.log(this.sendmessage)
        this.sendmessagesign=[];
        this.sendmessage=[];
        let checkedCount = value.length

        for(let j=0;j<value.length;j++)
        {
          for(let i=0;i<this.tableData.length;i++)
          {
            if(value[j]===this.tableData[i].id)
            {
              this.sendmessagesign.push(this.tableData[i]);
              this.sendmessage.push({
                id:this.tableData[i].id,
                name:this.tableData[i].name,
                date1:this.tableData[i].date1,
                date2:this.tableData[i].date2,
              })
            }
          }
        }
        console.log(this.sendmessage);
        this.checkAll = checkedCount === this.checkedGameId.length

        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedGameId.length

      },
      submit(){
           console.log(this.sendmessage)
           this.$axios({
             method:'post',
             url:'/convenienceCardApply',
             data: JSON.stringify(
               this.sendmessage,
             ),
             headers: {
               'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
             },
           }).then(res=>{
             this.$message({
               message: res.data.message,
               type: "success"
             });
           })
      },
      watchstate(row)
      {
        console.log(row);
        this.$axios({
          method:'post',
          url: "/getApplyStatus",
          data:JSON.stringify({
            date1: row.date1,
            date2: row.date2,
            idCard: row.id,
            username: row.username,
          })
        }).then(res=>{
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })

      }
    },
    created () {
      var aData = new Date();
      var date1 = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      var date2=aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + (aData.getDate()+1)+" 00:00:00-23:59:59";
        this.$axios({
          method: 'post',
          url: '/getFamilyInfo',
          data: JSON.stringify(
            this.$store.state.user.idCard,
          ),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
          },
        }).then(res => {
            if (res.data.result.length !== 0) {
              this.tableData = res.data.result

              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].date1=date1;
                this.tableData[i].date2=date2;
                this.checkedGameId.push(this.tableData[i].id);
                this.multipleSelection = this.checkedGameId;
              }
            }
          }
        ).catch(err => {

        })

    }
  }
</script>
<style>
  #form {
    font-family: Helvetica, sans-serif;
    text-align: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
  }
</style>

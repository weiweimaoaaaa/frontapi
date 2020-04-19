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
      <el-menu-item index="1">物资申请管理</el-menu-item>
    </el-menu>
    <br/>
    <el-row>
      <el-col :span="1" class="grid">
        <el-button
          type="success"
          @click="addFlag=true,dialogVisible=true"
          icon="el-icon-circle-plus-outline"
          size="mini"
          round
        >新增</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table
      :data="manList"
      border
      style="width: 100%"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <el-table-column label="序号" type="index" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{(page - 1) * size + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user" label="身份证号" width="150px"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150px"></el-table-column>
      <el-table-column prop="applyDate" label="申请日期" width="150px"></el-table-column>
      <el-table-column prop="category" label="物资分类" width="150px"></el-table-column>
      <el-table-column prop="name" label="物资姓名" width="150px"></el-table-column>
      <el-table-column prop="number" label="物资数量" width="150px"></el-table-column>
      <el-table-column label="编辑" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editman(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="150">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delman(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submit()" style="margin-left:100px;width: 10%;background: #505458;border: none">提交</el-button>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      style="float:right"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      :title="addFlag?'新增家庭成员':'修改家庭成员'"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="身份证号" style="width:300px">
          <el-input v-model="man.user" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="width:280px">
          <el-input v-model="man.username" placeholder="请输入性名"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="region">
          <el-select v-model="man.category" placeholder="请选择类别">
            <el-option label="生活用品" value="生活用品"></el-option>
            <el-option label="药品" value="药品"></el-option>
            <el-option label="食物" value="食物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="man.category==='生活用品'" label="物资名称" style="width:250px">
          <el-select v-model="man.name" placeholder="请选择物品">
            <el-option label="卫生纸" value="卫生纸（袋）"></el-option>
            <el-option label="牙膏" value="牙膏（支）"></el-option>
            <el-option label="洗发液" value="洗发液（瓶）"></el-option>
            <el-option label="沐浴露" value="沐浴露（瓶）"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="man.category==='药品'" label="物资名称" style="width:250px">
          <el-select v-model="man.name" placeholder="请选择物品">
            <el-option label="消毒液" value="消毒液"></el-option>
            <el-option label="酒精" value="酒精"></el-option>
            <el-option label="棉签" value="棉签"></el-option>
            <el-option label="999感冒灵" value="999感冒灵"></el-option>
            <el-option label="板蓝根" value="板蓝根"></el-option>
            <el-option label="布洛芬" value="布洛芬"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else-if="man.category==='食物'" label="物资名称" style="width:250px">
          <el-select v-model="man.name" placeholder="请选择物品">
            <el-option label="米" value="米"></el-option>
            <el-option label="盐" value="盐"></el-option>
            <el-option label="油" value="油"></el-option>
            <el-option label="萝卜" value="萝卜"></el-option>
            <el-option label="白菜" value="白菜"></el-option>
            <el-option label="辣椒酱" value="辣椒酱"></el-option>
            <el-option label="茄子" value="茄子"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物资数量" style="width:250px">
          <el-input type="number" v-model="man.number" placeholder="请输入物资数量" min="0"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="saveman()">提交</el-button>
        <el-button type="primary" @click="quxiao()">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      style="text-align:left !important"
      :visible.sync="dialog2Visible"
      :before-close="handleClose"
    >
      <span>你确定要删除此成员吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDel()">提交</el-button>
        <el-button type="primary" @click="dialog2Visible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  export default {
    data() {
      return {
        dialogVisible: false,
        dialog2Visible: false,
        activeIndex2: "1",
        total: 0,
        size: 5,
        page: 1,
        manList: [
        ],
        sendmessage:[],
        materal:{
          finished:1,
        },
        delmanmodel:{},
        man: {
        },
        addFlag: true,
        date: "",
        msg:''
      };
    },
    created () {
      this.man.user=this.$store.state.user.idCard;
      this.man.username=this.$store.state.user.username;
      var aData = new Date();
      this.man.applyDate = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      this.date=aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
      this.getmateralList()
    },
    watch:{
      //2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
      //可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
      total(){
        if(this.total===(this.page-1)*this.size&& this.total!==0){
          this.page-=1;
          this.getmanList()
        }
      }
    },
    methods: {
      handleClose(done) {
        done();
      },
      handleSizeChange(val){
        this.size = val
        this.getmanList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getmanList();
      },
      submit(){
        for(let i=0;i<this.manList.length;i++)
        {
           this.$delete(this.manList[i],"username")
        }
        console.log(this.manList);
        this.$axios({
          method:'post',
          url:'/registerMaterialsApply',
          data:JSON.stringify(
            this.manList,
          ),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
          },
        })
          .then(result=>{
            this.msg = result.data.message;
            console.log(this.msg)
            this.manList=[]
          })
          .catch(err=>{

          })

      },
      saveman() {
        if(this.addFlag) {
          this.manList.push(this.man);
          this.man={user:this.$store.state.user.idCard,username:this.$store.state.user.username,applyDate:this.date};
          this.dialogVisible = false;
        }
        else
        {
         for(let i=0;i<this.manList.length;i++)
         {
           if(this.man.user===this.manList[i].user)
           {
             this.manList.splice(i,1);
             break;
           }
         }
         this.manList=[...this.manList,this.man];
          this.man={user:this.$store.state.user.idCard,username:this.$store.state.user.username,applyDate:this.date};
          this.dialogVisible = false;
        }
      },
      async getmateralList() {
        this.$axios({
          method:'post',
          url:'/getMaterialsApplyInfo',
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
              for(let item in this.manList)
              {
                item.id=item.user;
                item.username=this.$store.state.user.username
              }
            }
            else
            {
              this.manList=[];
            }
          }
        ) .catch(err=>{

        })
      },
      delman(row) {
        this.addFlag = false;
        this.dialog2Visible = true;
        this.delmanmodel= row;

      },
      async handleDel() {
        for(let i=0;i<this.manList.length;i++)
        {
          if(this.delmanmodel.user===this.manList[i].user)
          {
            this.manList.splice(i,1);
            break;
          }
        }
        this.delmanmodel={};
        this.dialogVisible=false;
      },
      editman(row) {
        this.man = row;
        this.dialogVisible = true;
        this.addFlag = false;
      },
      quxiao(){
        this.dialogVisible = false;
        this.man={};
        this.man.address=this.address;
      },
    },

  };
</script>

<style>
  #form {
    font-family: Helvetica, sans-serif;
    text-align: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>

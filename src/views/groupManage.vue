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
      <el-menu-item index="1">家庭人员管理</el-menu-item>
    </el-menu>
    <br />
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
      <el-table-column prop="idcard" label="身份证号" width="150px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150px"></el-table-column>
      <el-table-column prop="Type" label="性别" width="150px"></el-table-column>
      <el-table-column prop="telephone" label="电话号码" width="150px"></el-table-column>
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
      :title="addFlag?'新增图书':'修改图书'"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="身份证号" style="width:300px">
          <el-input v-model="man.idcard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="width:280px">
          <el-input v-model="man.name" placeholder="请输入性名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="region">
          <el-select v-model="man.Type" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" style="width:250px">
          <el-input v-model="man.telephone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="saveman()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      style="text-align:left !important"
      :visible.sync="dialog2Visible"
      :before-close="handleClose"
    >
      <span>你确定要删除这本图书吗?</span>
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
          {
            ID:123,
            idcard:'刘威',
            Type:'男',
            name:'刘威',
            telephone:123,
          }
        ],
        man: {},
        addFlag: true,
        curId: ""
      };
    },
    watch:{
      //2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
      //可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
      total(){
        if(this.total==(this.page-1)*this.size&& this.total!=0){
          this.page-=1;
          this.getmanList()
        }
      }
    },
    created () {
      this.getmanList();
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
      async getmanList() {
        try {
          let res = await axios.post(
            "http://127.0.0.1:8843/api/list",
            qs.stringify({
              admin:this.$store.state.user.username,
            })
          );
          this.total = res.data.Data.Total;
          this.manList = res.data.Data.List;

        } catch (e) {
          console.log(e);
        }
      },
      async saveman() {
        try {
          let res = await axios.post(
            "http://127.0.0.1:8843/api/save",
            qs.stringify({
              id: this.man.ID,
              idcard: this.man.idcard,
              type: this.man.Type,
              name: this.man.name,
              telephone: this.man.telephone
            })
          );
          this.dialogVisible = false;
          this.man = {};
          this.$message({
            message: res.data.Msg,
            type: "success"
          });
          this.getmanList();
        } catch (e) {
          console.log(e);
        }
      },
      delman(row) {
        this.addFlag = false;
        this.dialog2Visible = true;
        this.curId = row.idcard;
      },
      async handleDel() {
        try {
          let res = await axios.post(
            "http://127.0.0.1:8843/api/del",
            qs.stringify({
              idcard: this.curId,
            })
          );
          this.curId = "";
          this.dialog2Visible = false;
          this.$message({
            message: res.data.Msg,
            type: "success"
          });
          this.getmanList();
        } catch (e) {
          console.log(e);
        }
      },
      editman(row) {
        this.man = row;
        this.dialogVisible = true;
        this.addFlag = false;
      }
    },
    mounted() {
      this.getmanList();
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

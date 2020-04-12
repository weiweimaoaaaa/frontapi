<template>
  <el-menu
    class="categories"
    default-active="0"
    active-text-color="red">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">家庭健康信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu'
  }
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -700px;
    top: 100px;
    width: 150px;
  }
</style>

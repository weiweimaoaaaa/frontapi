<template>
  <div style="margin-top: 40px">
    <side-menu id="side-menu"></side-menu>
    <div class="home">
      <div id="header-div">
        <carousel></carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import Carousel from './Carousel'
  import SideMenu from './SideMenu'
  export default {
    name: 'AppIndex',
    components:{Carousel,SideMenu}
  }
</script>

<style scoped>
  .home {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;

  }

  #header-div {
    padding-bottom: 20px;
    padding-left: 5px;
    background-color: white;
  }

  #side-menu {
    position: fixed;
    margin-left: 50%;
    left: -680px;
    top: 100px;
  }
</style>

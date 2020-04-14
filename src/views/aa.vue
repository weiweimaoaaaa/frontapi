<template>
  <div class="accept-container">
    <iframe style="position:absolute;top:0px;left: 200px;" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto src="https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        iframeState:false,
        goBackState:false,
        webAddress: [
          {
            name:'简书',
            link:'https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3'
          }
        ]
      }
    },
    mounted(){
      const oIframe = document.getElementById('show-iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = deviceHeight + 'px';
    },
    methods:{
      goBack(){
        this.goBackState = false;
        this.iframeState = false;
      },
      showIframe(){
        this.goBackState = true;
        this.iframeState = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


















































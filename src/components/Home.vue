<template>
  <div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="activeIndex"
      router
      style="min-height:100vh;width:230px;float:left"
    >
      <NavMenu :navMenus="menuData"></NavMenu>
    </el-menu>
    <router-view style="margin-left:250px"></router-view>
  </div>
</template>

<script>

  import NavMenu from './common/NavMenu'
  export default {
    name: 'Home',
    components:{NavMenu},
    data() {
      return {
        activeIndex: 'aa',
        menuData: [
          {
            //一级
            entity: {
              id: 0,
              name: "aamanage",
              icon: "el-icon-message",
              alias: "疫情消息"
            },
            //二级
            childs: [
              {
                entity: {
                  id: 55,
                  name: "aa",
                  icon: "el-icon-message",
                  alias: "全国疫情通报"
                },
              },
              {
                entity: {
                  id: 66,
                  name: "knowledge",
                  icon: "el-icon-message",
                  alias: "疫情知识"
                },
              },
            ]
          },
          {
            //一级
            entity: {
              id: 1,
              name: "systemManage",
              icon: "el-icon-message",
              alias: "健康信息填报"
            },
            //二级
            childs: [
              {
                entity: {
                  id: 3,
                  name: "authManage",
                  icon: "el-icon-loading",
                  alias: "echarts折线图-图例过滤"
                }
              },
              {
                entity: {
                  id: 4,
                  name: "roleManage",
                  icon: "el-icon-bell",
                  alias: "echarts折线图-图例点击",
                }
              },
              {
                entity: {
                  id: 2,
                  name: "menuManage",
                  icon: "el-icon-edit",
                  alias: "健康信息填报",
                  value: "/system/menu"
                }
              },
              {
                entity: {
                  id: 5,
                  name: "groupManage",
                  icon: "el-icon-mobile-phone\r\n",
                  alias: "家庭信息管理",
                  value: "/system/group"
                }
              }
            ]
          },
          {
            //一级
            entity: {
              id: 6,
              name: "userManage",
              icon: "el-icon-news",
              alias: "家庭申请"
            },
            //二级
            childs: [
              {
                entity: {
                  id: 7,
                  name: "accountManage",
                  icon: "el-icon-phone-outline\r\n",
                  alias: "药品 便民卡",
                  value: ""
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 14,
                      name: "emailManage",
                      icon: "el-icon-sold-out\r\n",
                      alias: "药品申请",
                      value: "/content/email"
                    }
                  },
                  {
                    entity: {
                      id: 13,
                      name: "passManage",
                      icon: "el-icon-service\r\n",
                      alias: "便民卡申请",
                      value: "/content/pass"
                    }
                  }
                ]
              },
              {
                entity: {
                  id: 8,
                  name: "integralManage",
                  icon: "el-icon-picture",
                  alias: "积分管理",

                  value: "/user/integral"
                }
              }
            ]
          },
          {
            //一级
            entity: {
              id: 40,

              name: "contentManage",
              icon: "el-icon-rank",
              alias: "四级菜单"
            },
            //er级
            childs: [
              {
                entity: {
                  id: 41,
                  name: "classifyManage2",
                  icon: "el-icon-printer",
                  alias: "分类管理"
                },
                //三级
                childs: [
                  {
                    entity: {
                      id: 42,
                      name: "classifyManage3",
                      icon: "el-icon-printer",
                      alias: "分类管理"
                    },
                    //四级
                    childs: [
                      {
                        entity: {
                          id: 43,
                          name: "classifyManage4",
                          icon: "el-icon-printer",
                          alias: "分类管理",
                          value: "/content/classify"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],

      };
    },
    mounted(){
      console.log(window.location.href)
      let start = window.location.href.lastIndexOf('/');
      let path = window.location.href.slice(start+1);
      this.activeIndex = path;

      console.log(this.activeIndex)
    }
  }
</script>

<style scoped>

</style>

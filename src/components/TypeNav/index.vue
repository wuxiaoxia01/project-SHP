<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 这里的transiton是动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(c1,index) in categoryList.slice(0,16)"
                :key="c1.categoryId"
                :class="{cur:currentIndex===index}"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 这里有自定义属性 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link>  -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{display:currentIndex===index?'block':'none'}"
                >
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 最好的引入方式是按需加载
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true
    };
  },
  // 组件挂载完毕时：可以向服务器发请求
  mounted() {
    // 如果当前路由不是home，则三级列表默认不显示
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state,其实即为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    // 鼠标进入修改相应书数据currentIndex属性
    // index:鼠标移上某一个一级分类数据的索引值
    // changeIndex(index){
    //     this.currentIndex = index;
    // },
    changeIndex: throttle(function(index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移出的时候
    leaveIndex() {
      this.currentIndex = -1;
      // 只有除home组件移出才会不展示
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 路由跳转的方法
    goSearch() {
      // 最好的解决方案：编程式导航+事件委派(全部的子节点委派给父节点)
      // 事件委派的问题(1.怎么确定是a标签2.点击a标签的时候，怎么确定是一级分类还是二级三级分类)
      // 1.给a标签加上自定义书写
      let element = event.target;
      // element.dataset可以获取节点的自定义属性与属性值(解析出来的时候好像是小写)
      let {
        categoryname,
        category1id,
        category2id,
        category3id
      } = element.dataset;
      // 如果标签身上拥有catagoryname一定是a标签
      if (categoryname) {
        // 确定几级分类
        // 整理路由的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 空对象再判断时为true,有就会合并
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由的跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标进入的时候，让商品分类进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    // 过渡动画的样式
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
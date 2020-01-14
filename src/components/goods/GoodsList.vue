<template>
  <div class="good-list">
    <!-- <router-link
      class="good-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodinfo/'+item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="new">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="cell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 网页跳转 -->
    <!-- a标签 标签跳转 -->
    <!-- 使用 window.location。href 形式跳转 编程式导航 -->
    <div class="good-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="new">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="cell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMoreGoods">加载更多</mt-button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      pageidnex: 1,
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageidnex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
            console.log(this.goodslist);
          }
        });
    },
    getMoreGoods() {
      this.pageidnex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 使用js的形式进行路由导航
      // 区别 $route  和   $router
      // this.$route   是一个路由参数对象  params query
      // this.$router  是一个路由导航对象 可以方便饿使用 js 代码
      // 实现  前进 后退 跳转新地址
      // 方式一
      // this.$router.push('/home/goodinfo/'+id)
      // 方式二 传递对象
      //   this.$router.push({path:'/home/goodinfo/'+id})
      //方式三 传递命名路由
      this.$router.push({ name: "goodinfo", params: { id } });
    }
  }
};
</script>



<style lang="scss" scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  .good-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0px;
        padding: 5px;
      }
      .price {
        .new {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 12px;
        }
      }
      .cell {
        display: flex;
        justify-content: space-between;
        font-style: 14px;
      }
    }
  }
}
</style>
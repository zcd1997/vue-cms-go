<template>
  <div class="goodinfo-containter">
    <!-- 小球运动 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品图片轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="new_price">￥{{goodinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <goodinfo_num @getcount="getCount" :maxcount="goodinfo.stock_quantity"></goodinfo_num>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
            <!-- 加入购物车业务 -->
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodinfo.goods_no}}</p>
          <p>库存情况：{{goodinfo.stock_quantity}}</p>
          <p>上架时间：{{goodinfo.addtime | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评价</mt-button>
      </div>
    </div>
  </div>
</template>



<script>
import swiper from "../subcomponent/Swiper.vue";
import goodinfo_num from "../subcomponent/GoodInfo_num.vue";
export default {
  data() {
    return {
      // 路由中的id属性
      id: this.$route.params.id,
      lunbotuList: [],
      goodinfo: [],
      //   控制小球的
      ballFlag: false,
      count: 1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    getGoodInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "gooddesc", parmas: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodcomment", parmas: { id } });
    },
    addToShopcar() {
      this.ballFlag = !this.ballFlag;
      // 拼接处一个保存到 store中的一个商品信息对象
      var goodinfo = {
        id: this.id,
        count: this.count,
        price: this.goodinfo.sell_price,
        selected: true
      };
      this.$store.commit("addToCar", goodinfo);
    },
    getCount(count) {
      // 获取购买数量
      // 使用子向父 传参思路
      this.count = count;
      console.log(this.count);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      // 分析原因 位置是写死的
      // 解决方法  domobject.getBoundingClientRect

      const xP = badgePosition.left - ballPosition.left;
      const yP = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xP}px,${yP}px)`;
      el.style.transition = "all 0.5s ease";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    swiper,
    goodinfo_num
  }
};
</script>



<style lang="scss" scoped>
.goodinfo-containter {
  background-color: #ccc;
  overflow: hidden;
  position: relative;
  .new_price {
    color: red;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50px;
    background-color: red;
    position: absolute;
    z-index: 9999;
    left: 142px;
    top: 318px;
  }
}
</style>
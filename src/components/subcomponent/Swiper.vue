<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组建中使用 v-for 一定要使用 key 绑定 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt="" :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
    props:["lunbotuList","isfull"]
};
</script>



<style lang="scss" scoped>
.mint-swipe {
  height: 150px;
  .mint-swipe-item {
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full{
  width: 100%;
}
</style>
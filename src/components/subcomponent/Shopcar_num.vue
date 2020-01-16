<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="goodscount"
      @change="countChange"
      ref="count"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>



<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      p: 1
    };
  },
  mounted() {
    // 初始化数字选择框
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChange() {
      // console.log(this.$refs.count.value)
    this.$store.commit('updateGoodCount',{id:this.goodid,count:this.$refs.count.value})
    }
  },
  props:['goodscount','goodid']
};
</script>


<style lang="scss" scoped>
</style>
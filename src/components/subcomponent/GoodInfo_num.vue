<template>
<!-- 这里的问题 max:undefined 我们不知道什么时候拿到max -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="count" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>



<script>
import mui from '../../lib/mui/js/mui.js'
export default {
    data() {
      return {
        p:1
      }
    },
    mounted(){
        // 初始化数字选择框
        mui('.mui-numbox').numbox()
    },
    methods:{
      countChange(){
        // console.log(this.$refs.count.value)
        this.$emit('getcount',parseInt(this.$refs.count.value));
      }
    },
    props:["maxcount"],
    watch:{
      // 属性监听
      // "maxcount":
      //   function(newVal,oldVal){
      //   console.log('6666')
      //   mui('.mui-numbox').numbox().setOption("max",newVal)
      // },
     maxcount: {
        handler: function(newVal,oldVal) {
          mui('.mui-numbox').numbox().setOption("max",newVal)
        },
      }
    }
}
</script>


<style lang="scss" scoped>
</style>
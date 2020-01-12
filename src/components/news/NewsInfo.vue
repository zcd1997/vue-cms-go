<template>
  <div class="newsinfo">
    <h1 class="title">{{newsinfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论组件区域 -->
    <comment-box :id='this.id'></comment-box>
  </div>
</template>



<script>
import { Toast } from "mint-ui";
import comment from '../subcomponent/Comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      //将url 传递的ID值 挂载到data上
      newsinfo: {}
    };
  },
  created() {
    this.getNewsinfo();
  },
  methods: {
    getNewsinfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取失败");
        }
      });
    }
  },
  components:{
      'comment-box':comment,
  }
};
</script>


<style lang="scss">
.newsinfo {
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
      
  }
}
</style>
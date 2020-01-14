<template>
  <div class="photoinfo-container">
    <!-- 标题 -->
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}}</span>
    </p>
    <!-- 缩略图 -->
    <div class="suolue clearfix">
      <vue-preview :slides="this.suoluelist"></vue-preview>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论 -->
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>


<script>
import commemt from "../subcomponent/Comment.vue";

export default {
  data() {
    return {
      // 绑定id
      id: this.$route.params.id,
      photoinfo: {},
      suoluelist: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getSuolueList();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
          console.log(this.photoinfo);
        }
      });
    },
    getSuolueList() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.suoluelist = result.body.message;
          console.log(this.suoluelist);
        }
      });
    }
  },
  components: {
    "cmt-box": commemt
  }
};
</script>


<style lang="scss" >
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  font-size: 0;
}
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 14px;
    line-height: 30px;
  }
  .suolue {
    padding: 10px;
    figure {
      float: left;
      width: 30%;
      height: calc(30vw - 0px);
      margin: 1.5%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
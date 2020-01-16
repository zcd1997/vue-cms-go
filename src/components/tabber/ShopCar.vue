<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">

      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
							@change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src='item.thumb_path' alt />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :goodscount="$store.getters.getGoodsCount[item.id]" :goodid='item.id'></numbox>
                <a href="#" @click.prevent='remove(item.id,i)'>删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
		
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计(不含运费)</p>
							<p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndPrice.count}}</span> 件 
							总价 <span class="red">￥{{$store.getters.getGoodsCountAndPrice.price}}</span></p>
						</div>
						<mt-button type="danger" >去结算</mt-button>
					</div>
					<!-- <p>{{$store.getters.getGoodsSelected}}</p> -->
					
        </div>
      </div>
    </div>
</template>



<script>
import numbox from "../subcomponent/Shopcar_num.vue";
export default {
	data() {
		return {
			goodslist:[]
		}
	},
	created(){
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			var idList =[]
			this.$store.state.car.forEach(item =>idList.push(item.id))
			if(idList.length <= 0){
				return;
			}
			this.$http.get('api/goods/getshopcarlist/'+idList.join(','))
			.then(result =>{
				if(result.body.status ===0){
						this.goodslist = result.body.message
						console.log(this.goodslist)
				}
			})
		},
		remove(id,index){
			this.goodslist.splice(index,1)
			this.$store.commit('removeGood',id)
		},
		selectedChange(id,val){
			console.log(id,val)
			this.$store.commit('updateSelected',{id,selected:val})
		}
	},
  components: {
    numbox
  }
};
</script>


<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }

    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
	.jiesuan{
		display:flex;
		justify-content:space-between;
		align-items:center;
		.red{
			color:red;
			font-weight:bold;
			font-size:16px;
		}
	}
}
</style>
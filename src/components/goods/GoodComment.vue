<template>
    <div>
        <cmtbox :id='$route.params.id'></cmtbox>
    </div>
</template>


<script>
import cmtbox from '../subcomponent/Comment.vue'
export default {
    components:{
        cmtbox
    }

}
</script>


<style lang="scss" scoped>

</style>
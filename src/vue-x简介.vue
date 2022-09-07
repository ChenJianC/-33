<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- 展示count -->
    <h1>{{ count }}</h1>
    <h1>count的十倍: {{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击count</button>
  </div>
</template>

<script>
// mapState --> 将vuex里面state映射到computed
// 使用
// - 引入mapState:函数，返回一个对象
// - 参数：[映射的属性]

// mapGetters --> 将vuex里面getters映射到computed

// mapMutations --> 将vuex里面mutations映射到methods
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.login {
  width: 700px;
  height: 88px;
}
</style>

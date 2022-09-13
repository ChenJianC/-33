<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多文章了"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// <!-- 属性 -->
//   <!-- @load: 触底的时候触发load事件 -->
//   <!-- offset: 滚动条和底部距离多少的时候触发load事件, 默认值是300px -->
//   <!-- immediate-check: 初渲染的时候是否执行load事件, 默认值是true  -->
//   <!-- v-model="loading" -->
//   <!-- loading为true,load事件不会被触发 -->
//   <!-- loading为false的时候,load事件会被触发 -->
//   <!-- loading会在load事件执行后,被van-list组件自动设置为ture, 需要手动的改为false -->
//   <!-- finished:Boolean. false:load事件会被触发 true:load事件不会被出发了, 并且显示finished-text的文本 -->
// 发送请求 拿到当前文章的详情数据
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: { ArticleItem },
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // new Date().valueof()
      // Date.now()
      // +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())

        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，.507原封不动上抛.400上抛中文，
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}
</style>

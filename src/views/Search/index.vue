<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史、建议、搜索结果 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：搜素框的值空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // this.keywords一定有值

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 即不渲染搜索结果也不渲染搜索历史

      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 去重：1.获取没有去重的数组2.放在new Set(arr)3.[.set]
      const distincHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distincHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>

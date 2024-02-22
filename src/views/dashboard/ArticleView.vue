<template>
  <h1>這是貼文頁面</h1>

</template>

<script>

const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1
    }
  },
  methods: {
    getArticles (page = 1) {
      this.currentPage = page
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/articles?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.articles = response.data.articles
          this.pagination = response.data.pagination
        }
        console.log(response)
      }).catch((error) => {
        // axios 的錯誤狀態，可參考：https://github.com/axios/axios#handling-errors
        console.log('error', error.response, error.request, error.message)
        this.isLoading = false
        alert(error.response.data.message)
      })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style scoped>
</style>

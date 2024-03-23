<template>
  <VueLoading :active="isLoading">
    <div class="loadingio-spinner-ellipsis-tyhni0y6d0m">
      <div class="ldio-vxrwqxfvut">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </VueLoading>

  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/blog">部落格列表</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ article.title }}</h2>
        <p>
          <small class="text-muted">
            {{ new Date(article.create_at * 1000).toLocaleDateString('zh-TW') }}
          </small> -
          <small class="text-muted">作者：{{ article.author }}</small>
        </p>
        <img :src="article.imageUrl" :alt="article.title" class="img-fluid mb-3">
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      isLoading: false,
      article: {},
      id: ''
    }
  },
  methods: {
    getArticle () {
      const api = `${VITE_API_URL}/api/${VITE_API_PATH}/article/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.article = response.data.article
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  },
  mounted () {
    this.id = this.$route.params.articleId
    this.getArticle()
  }
}
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ new Date(article.create_at * 1000).toLocaleDateString('zh-TW') }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="getArticle(article.id)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" type="button" @click="openDelArticleModal(article)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ArticleModal -->
    <div class="modal fade" id="articleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="articleModal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增貼文</span>
              <span v-else>編輯貼文</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempArticle.title" placeholder="請輸入標題" />
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempArticle.imageUrl" placeholder="請輸入圖片連結" />
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">作者</label>
                  <input type="text" class="form-control" id="author" v-model="tempArticle.author" placeholder="請輸入標題" />
                </div>
                <div class="mb-3">
                  <label for="create_at">文章建立日期</label>
                  <input type="date" class="form-control" id="create_at" v-model="create_at" />
                </div>
              </div>
              <div class="col-sm-8">
                <label for="tag" class="form-label">標籤</label>
                <div class="row gx-1 mb-3">
                  <div class="col-md-2 mb-1" v-for="(label, key) in tempArticle.tag" :key="key">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control form-control" id="tag" v-model="tempArticle.tag[key]" placeholder="請輸入標籤" />
                      <button type="button" class="btn btn-outline-danger" @click="tempArticle.tag.splice(key, 1)">
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-2 mb-1" v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" type="button" @click="tempArticle.tag.push('')">
                      新增標籤
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">文章描述</label>
                  <textarea type="text" class="form-control" id="description" v-model="tempArticle.description" placeholder="請輸入文章描述"></textarea>
                </div>
                <div class="mb-3">
                  <ckeditor :editor="editor" :config="editorConfig" v-model="tempArticle.content"></ckeditor>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="tempArticle.isPublic" id="isPublic" />
                    <label class="form-check-label" for="isPublic">
                      是否公開
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateArticle(tempArticle)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ArticleModal -->
    <!-- DelModal -->
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="delArticleModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <span>刪除 {{ tempArticle.title }}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempArticle.title }}</strong> (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
            </button>
            <button type="button" class="btn btn-danger" @click="delArticle">確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- DelModal -->
    <PaginationComponents :pages="pagination" @emitPages="getArticles" />
  </div>
</template>

<script>
import PaginationComponents from '@/components/PaginationComponents.vue'
import { Modal } from 'bootstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      currentPage: 1,
      tempArticle: {
        tag: ['']
      },
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      },
      articleModal: null,
      delArticleModal: null,
      pagination: {}
    }
  },
  watch: {
    article () {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false
      }
      this.create_at = new Date(this.tempArticle.create_at * 1000).toISOString().split('T')[0]
    },
    create_at () {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
        this.isNew = false
      }
      this.articleModal.show()
    },
    openDelArticleModal (item) {
      this.tempArticle = { ...item }
      this.delArticleModal.show()
    },
    updateArticle (item) {
      this.tempArticle = item
      let api = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article`
      let httpMethod = 'post'
      this.isLoading = true
      if (!this.isNew) {
        api = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempArticle }).then((response) => {
        this.isLoading = false
        this.articleModal.hide()
        this.getArticles(this.currentPage)
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    },
    delArticle () {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.tempArticle.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.isLoading = false
        this.delArticleModal.hide()
        this.getArticles(this.currentPage)
      }).catch((error) => {
        this.isLoading = false
        alert(error.response.data.message)
      })
    },
    getArticle (id) {
      const api = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.isLoading = false
        this.openModal(false, response.data.article)
        this.isNew = false
      }).catch((error) => {
        this.isLoading = false
        alert('error', error.response, error.request, error.message)
      })
    },
    getArticles (page = 1) {
      this.currentPage = page
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/articles?page=${page}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.isLoading = false
        const data = response.data
        if (data && data.success) {
          this.articles = data.articles
          this.pagination = data.pagination
        } else {
          console.error('API request failed:', data.error)
        }
      }).catch((error) => {
        this.isLoading = false
        console.error('API request failed:', error)
      })
    }
  },
  components: {
    PaginationComponents
  },
  mounted () {
    this.articleModal = new Modal(this.$refs.articleModal)
    this.delArticleModal = new Modal(this.$refs.delArticleModal)
    this.getArticles()
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>

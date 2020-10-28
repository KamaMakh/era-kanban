<template>
  <div class="card">
    <h2 class="card-name">{{data.name}}</h2>
    <div class="content-wrap">
      <ContentCard v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name" @edit="openDialog"></ContentCard>
      <div class="content-wrap--plus">
        <el-button type="primary" icon="el-icon-plus" circle @click="dialog = true"></el-button>
      </div>
    </div>
    <el-divider/>
    <el-dialog :title="task.id ? 'Сохранить задачу' : 'Добавить задачу'" :visible.sync="dialog" width="400px">
      <el-form
        ref="postForm"
        :model="task"
        :rules="rules"
        class="form-container"
        label-position="top"
        @submit.prevent="sendItem()"
      >
        <el-row style="display: flex; justify-content: center">
          <el-col :span="24">
            <el-form-item label="Название" prop="title">
              <el-input
                v-model="task.title"
                autosize
              />
            </el-form-item>
            <el-form-item label="Описание" prop="description">
              <el-input
                v-model="task.description"
                type="textarea"
                autosize
              />
            </el-form-item>
            <el-form-item label="Цвет" prop="color">
              <el-color-picker v-model="task.color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Отмена</el-button>
        <el-button v-loading="loading" style="margin: 5px;" type="primary" @click="sendItem">
          {{ task.id ? 'Сохранить' : 'Добавить' }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ContentCard from '@/components/ContentCard.vue'
  import database from '../assets/config.js'

  export default {
    title: 'KanbanCard',
    props: ['data'],
    components: {
      ContentCard
    },
    data: function () {
      return {
        task: {
          name: '',
          description: '',
          color: '#999999'
        },
        rules: {
          title: [{required: true, message: 'обязательно для заполнения', trigger: 'blur'}],
          description: [{required: true, message: 'обязательно для заполнения', trigger: 'blur'}],
          color: [{required: true, message: 'обязательно для заполнения', trigger: 'blur'}]
        },
        loading: false,
        dialog: false,
        currentUser: null
      }
    },
    methods: {
      sendItem() {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.loading = true
            let data = {
              title: this.task.title,
              description: this.task.description,
              user: this.data.name,
              color: this.task.color
            }
            if (this.task.id) {
              data['id'] = this.task.id
            }
            if (this.task.id) {
              database.ref(`tasks/${this.task.id}`).update(data)
            } else {
              database.ref('tasks').push(data)
            }
            this.task = {
              name: '',
              description: '',
              color: '#999999'
            }
            this.loading = false
            this.dialog = false
          }
        })
      },
      openDialog(data) {
        this.task = JSON.parse(JSON.stringify(data))
        this.dialog = true
      }
    },
    created() {
      this.cardTitle = this.title
    }
  }
</script>

<style scoped lang="scss">
  .card {
    font-size: 10px;
    color: #4684f6;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: none;
    border-radius: 5px;
    position: relative;
    text-align: left;

    .content-wrap {
      display: inline-flex;
      position: relative;
      flex-wrap: wrap;
      &--plus {
        position: absolute;
        left: auto;
        top: 50%;
        margin-top: -18px;
        right: -18px;
      }
    }

    .card-name {
      text-align: left;
      color: #333;
      padding: 15px;
      margin-bottom: 20px;
    }
  }

  .card h2 {
    padding: 20px;
  }
</style>

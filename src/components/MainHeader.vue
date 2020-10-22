<template>
  <div class="main-header">
    <h1>ЭРА канбан</h1>
    <!-- <i class="fas fa-plus"></i> -->
    <el-form
      ref="postForm"
      :model="task"
      :rules="rules"
      class="form-container"
      label-position="top"
      @submit.prevent="sendItem()"
    >
      <el-row style="display: flex; justify-content: center">
        <el-col :span="12">
          <el-form-item label="Название" prop="name">
            <el-input
              v-model="task.name"
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
          <el-form-item label="Сотрудник" prop="user">
            <el-select v-model="task.user" placeholder="Выберите из списка">
              <el-option v-for="(user, index) in CONSTANTS.users" :key="index" :label="user.name" :value="user.value" />
            </el-select>
          </el-form-item>
          <el-button v-loading="loading" style="margin: 5px;" type="success" @click="sendItem">
            Добавить
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'MainHeader',
  data () {
    return {
      task: {
        name: '',
        description: '',
        user: ''
      },
      rules: {
        name: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }],
        description: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }],
        user: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    sendItem () {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          database.ref('tasks').push({
            title: this.task.name,
            description: this.task.description,
            user: this.task.user
          })
          this.task.name = ''
          this.task.description = ''
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
html,
body {
  font-family: 'Lato',serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

h1,
h2,
h3 {
  padding: 0;
  margin: 0;
}
.main-header h1 {
  color: #4684f6;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  border-top: #4684f6 3px solid;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: #4684f6;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 50px;
  cursor: pointer;
}

.main-header input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

input {
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>

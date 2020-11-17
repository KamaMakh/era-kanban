<template>
  <div class="users">
    <div class="users__header">
      <h1 class="mb-20">Сотрудники</h1>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">Добавить</el-button>
    </div>
    <el-table
        :data="users"
        style="width: 100%"
    >
      <el-table-column
          prop="name"
          label="ФИО"
      >
      </el-table-column>
      <el-table-column
          prop="role"
          label="Роль"
      >
      </el-table-column>
      <el-table-column
          prop="userName"
          label="userName"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="Действия"
          align="center"
      >
        <template slot-scope="{ row }">
          <el-button @click="handleDelete(row)" type="danger" size="mini">Удалить</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="handleUpdate(row)">Редактировать</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="currentUser.id ? `Редактирование сотрудника` : `Создание сотрудника`" :visible.sync="dialogUser" width="400px">
      <el-form ref="postForm" label-position="top" :model="currentUser" :rules="rules" class="form-container" @submit.prevent="submitForm()">
        <div class="createPost-main-container">
          <el-row>
            <el-col>
              <el-form-item prop="name" label="Имя">
                <el-input
                    ref="name"
                    v-model="currentUser.name"
                    placeholder="Илон Маск"
                    name="name"
                    type="text"
                />
              </el-form-item>
              <el-form-item prop="role" label="Роль">
                <el-input
                    ref="role"
                    v-model="currentUser.role"
                    placeholder="Андроид разработчик"
                    name="role"
                    type="text"
                />
              </el-form-item>
              <el-form-item v-if="!currentUser.id" prop="userName" label="userName">
                <el-input
                    ref="id"
                    v-model="currentUser.userName"
                    placeholder="IlonMask"
                    name="id"
                    type="text"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUser = false" size="small">Отмена</el-button>
        <el-button type="primary" @click="submitForm" size="small">Сохранить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import database from "@/assets/config";

export default {
  name: "Users",
  data() {
    return {
      users: [],
      dialogUser: false,
      loadingObj: {},
      currentUser: {},
      rules: {
        userName: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }],
        name: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }],
        role: [{ required: true, message: 'обязательно для заполнения', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getUsers() {
      const leadsRef = database.ref('users')
      leadsRef.on('value', (snapshot) => {
        const Users = []
        snapshot.forEach((childSnapshot) => {
          const obj = childSnapshot.val()
          obj.id = childSnapshot.key
          Users.push(obj)
        })
        this.users = Users
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loadingObj = this.$loading({
            lock: true,
            target: document.querySelector('.users')
          })
          let data = {
            userName: this.currentUser.userName,
            name: this.currentUser.name,
            role: this.currentUser.role
          }
          if (this.currentUser.id) {
            data['id'] = this.currentUser.id
            database.ref(`users/${this.currentUser.id}`).update(data)
              .finally(() => {
                this.currentUser = {}
                this.loadingObj.close()
                this.dialogUser = false
              })
          } else {
            database.ref('users').push(data).on('value', () => {
              this.currentUser = {}
              this.loadingObj.close()
              this.dialogUser = false
            });
          }
        }
      })
    },
    handleCreate() {
      if (this.checkAdmin()) {
        this.currentUser = {}
        this.dialogUser = true
      }
    },
    handleUpdate(user) {
      if (this.checkAdmin()) {
        this.currentUser = JSON.parse(JSON.stringify(user))
        this.dialogUser = true
      }
    },
    handleDelete(user) {
      if (this.checkAdmin()) {
        if (window.confirm('Вы действительно хотите удалить данного сотрудника?')) {
          this.loadingObj = this.$loading({
            lock: true,
            target: document.querySelector('.users')
          })
          database.ref(`users/${user.id}`).remove()
              .finally(() => {
                this.loadingObj.close()
              })
        }
      }
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">
.users {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  .el-table {
    text-align: left;
  }
  &__header {
    display: flex;
    align-items: flex-end;
    margin: 25px 0;
    h1 {
      margin: 0 20px 0 0;
    }
  }
}
</style>

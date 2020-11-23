<template>
  <div class="home">
    <div style="width: 500px; margin: 15px auto;">
      <el-row>
        <el-col :span="18">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="До"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="saveDate" :disabled="!dateRange">
            Сохранить
          </el-button>
        </el-col>
      </el-row>
    </div>
    <MainHeader></MainHeader>
    <div class="container">
      <div v-if="loaded" class="container-card">
        <KanbanCard v-for="(taskData, index) in taskLists" :key="index" :taskData="taskData" @remove="removeTask"></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MainHeader from '@/components/MainHeader.vue'
  import KanbanCard from '@/components/KanbanCard.vue'
  // import database from '../assets/config.js'

  import database from '../assets/config.js'

  export default {
    name: 'home',
    components: {
      MainHeader,
      KanbanCard
    },
    data: function () {
      return {
        taskLists: {},
        dateRange: [],
        users: {},
        loaded: false,
        triggerData: null
      }
    },
    computed: {
      pickerOptions: function() {
        return {
          disabledDate(date) {
            return date.getTime() < Date.now()
          }
        }
      },
    },
    methods: {
      saveDate() {
        database.ref('date').set({
          dates: JSON.stringify(this.dateRange)
        }, function (error) {
          console.log(error);
        })
      },
      getUsers() {
        return new Promise((resolve) => {
          const leadsRef = database.ref('users')
          leadsRef.on('value', (snapshot) => {
            const Users = {}
            snapshot.forEach((childSnapshot) => {
              const obj = childSnapshot.val()
              obj.id = childSnapshot.key
              Users[obj.userName] = obj
            })
            this.users = Users
            resolve()
          })
        })
      },
      getTasks() {
        const leadsRef = database.ref('tasks')
        leadsRef.on('value',  (snapshot) => {
          for (const index in this.users) {
            if (this.users[index]) {
              this.users[index]['data'] = []
            }
          }
          snapshot.forEach((childSnapshot) => {
            try {
              const obj = childSnapshot.val()
              obj.id = childSnapshot.key
              this.users[childSnapshot.val().user].data.push(obj)
            } catch (e) {
              console.log(e);
              console.log(this.users);
              console.log(childSnapshot.val().user);
            }
          })
          this.taskLists = this.users
          this.loaded = true
        })

        const dateRef = database.ref('date')
        let dates = ''
        dateRef.on('value',(snap)=>{
          if (snap && snap.val()) {
            dates = JSON.parse(snap.val().dates)
          }
          this.dateRange = dates
        });
      },
      removeTask(task) {
        database.ref(`tasks/${task.id}`).remove()
          .then(() => {
            this.taskLists[task.user].data.forEach((item, key) => {
              if (item.id === task.id) {
                this.taskLists[task.user].data.splice(key, 1)
              }
            })
            this.$forceUpdate()
          })
      },
    },
    mounted() {
      this.getUsers().then(() => {
        this.getTasks()
      })
    }
  }
</script>

<style lang="scss">
  .home {
    max-width: 1200px;
    margin: 0 auto;
    .container-card {
      margin: 15px 0;
      display: block;
      text-align: center;
    }

    .container {
      width: 100%;
      min-height: 675px;
    }
  }

</style>

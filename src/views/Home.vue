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
      <div class="container-card">
        <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard>
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

  const taskData = {
    kamron: {
      name: 'kamron',
      data: []
    },
    abror: {
      name: 'abror',
      data: []
    },
    sergey: {
      name: 'sergey',
      data: []
    },
    orlov: {
      name: 'orlov',
      data: []
    },
    tsaryov: {
      name: 'tsaryov',
      data: []
    },
    lyuba: {
      name: 'lyuba',
      data: []
    },
    anastasiya: {
      name: 'anastasiya',
      data: []
    },
    khusan: {
      name: 'khusan',
      data: []
    },
    main: {
      name: 'main',
      data: []
    }
  }
  // dateRef.on('value', function (snapshot) {
  //   snapshot.forEach(function (childSnapshot) {
  //     console.log(childSnapshot.val())
  //     if (childSnapshot.val().dateRange) {
  //       dates = childSnapshot.val().dateRange
  //     }
  //   })
  // })

  export default {
    name: 'home',
    components: {
      MainHeader,
      KanbanCard
    },
    data: function () {
      return {
        taskLists: [],
        dateRange: []
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
      }
    },
    created() {
    },
    mounted() {
      const leadsRef = database.ref('tasks')
      leadsRef.on('value', function (snapshot) {
        taskData['kamron'].data = []
        taskData['abror'].data = []
        taskData['sergey'].data = []
        taskData['orlov'].data = []
        taskData['tsaryov'].data = []
        taskData['lyuba'].data = []
        taskData['anastasiya'].data = []
        taskData['khusan'].data = []
        taskData['main'].data = []
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().user !== 'main') {
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData[childSnapshot.val().user].data.push(obj)
          } else {
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData['main'].data.push(obj)
          }
        })
      })

      const dateRef = database.ref('date')
      let dates = ''
      dateRef.on('value',(snap)=>{
        if (snap && snap.val()) {
          dates = JSON.parse(snap.val().dates)
        }
        console.log(dates);
      });

      this.taskLists = taskData
      this.dateRange = dates
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

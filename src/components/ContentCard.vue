<template>
  <div class="cardContent">
    <h2>{{item.title}}</h2>
    <div class="container-button">
      <div style="font-size: 14px">
        {{ item.description }}
      </div>
      <div style="margin-top: 15px">
        <el-button @click="removeItem">Удалить</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'ContentCard',
  data: function () {
    return {
    }
  },
  props: ['item', 'name'],
  methods: {
    removeItem () {
      database.ref(`tasks/${this.item.id}`).remove()
    }
  },
  created () {
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: #fff;
  width: 70%;
  min-height: 100px;
  background-color: #4684f6;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
}

.card h2 {
  padding-top: 20px;
  font-size: 20px;
}

.container-button h4 {
  color: #4684f6;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>

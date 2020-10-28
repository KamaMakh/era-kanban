<template>
  <div class="cardContent">
    <div class="cardContent__header">
      <h2 class="cardContent--title">{{item.title}}</h2>
      <el-dropdown>
        <el-button size="small">
          <i class="el-icon-arrow-down el-icon"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$emit('edit', item)">Редактировать</el-dropdown-item>
          <el-dropdown-item @click.native="removeItem">Удалить</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="cardContent--button">
      <div>
        {{ item.description }}
      </div>
    </div>
    <div class="cardContent__line" :style="{ background: item.color ? item.color : '#999' }"></div>
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

<style scoped lang="scss">
.cardContent {
  font-size: 10px;
  color: #fff;
  min-width: 250px;
  width: 25%;
  height: 200px;
  background-color: #fff;
  text-align: left;
  cursor: pointer;
  padding: 15px;
  border-right: 1px solid lightgray;
  box-shadow: 0px 5px 4px #c0c0c09d;
  position: relative;
  &--title {
    color: #333;
    text-decoration: underline;
    margin-top: 0;
    padding-top: 0 !important;
    font-size: 13px;
  }
  &--button {
    color: #999;
    font-size: 14px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__line {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 3px;
    background: green;
  }
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

<template>
  <PlayerAlert></PlayerAlert>
  <div id="player">
    <PlayerTopbar></PlayerTopbar>
    <div class="main-view">
      <PlayerContainer></PlayerContainer>
      <PlayerVideoDetail></PlayerVideoDetail>
    </div>
  </div>
</template>

<script setup>
  import PlayerTopbar from './components/Player-Topbar.vue';
  import PlayerContainer from "./components/Player-Container.vue"
  import PlayerVideoDetail from './components/Player-VideoDetail.vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import PlayerAlert from './components/Player-Alert.vue';
  

</script>

<style>



  /* 在全局样式文件中覆盖Element Plus的CSS变量 */
  :root {
    --el-color-primary: rgb(35, 173, 229);
    --el-text-color-primary: rgb(231, 233, 235);
    --el-bg-color: rgb(20, 20, 20);
    --el-fill-color-light:rgb(35, 37, 39);
    --el-bg-color-overlay:rgb(35, 37, 39);
  }

  .el-overlay {
    position: absolute;
    overflow: hidden;
  }

  .el-overlay-dialog {
    position: absolute;
    overflow: hidden;
  }

  .el-drawer__body{
    overflow: hidden !important;
  }

  *{
    margin: 0;
    padding: 0;
  }

  body{
    overflow: hidden;
  }

  .rightfix{
    float: right;
  }
  .leftfix{
    float:left;
  }

   .clearfix::after{
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  } 


  #player{
    display: flex;
    /* margin-top: 30px; */
    height: calc(100vh);
    width: 100%;
    flex-direction: column;
    /* background-color: palegreen; */
  }

  .main-view{
    display: flex;
    /* flex-direction: column; */
    /* flex: 15; */
    height: 94%;
    flex-grow: 0;

    /* background-color: purple; */
    /* position: relative; */
    /* background-color: purple; */
  }

    /* 滚动条样式 */
    ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
      background: black;
      border-radius: 8px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
      background: rgba(201, 201, 202, .5);
      border-radius: 8px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
      /* background: rgb(162, 162, 163); */
      background: rgba(201, 201, 202, .5);
      border-radius: 8px;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border: none;
    border-bottom: 1px solid rgb(101, 83, 53);
    color:rgb(254, 144, 76);
  }

  .el-tabs__header,.el-tabs__nav-wrap,.el-tabs__nav-scroll,.el-tabs__nav{
    border-radius: 24% 24% 0 0;
  }

</style>
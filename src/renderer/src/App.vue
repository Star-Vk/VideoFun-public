<template>
  <!-- <SysTopBar></SysTopBar> -->
  <div id="main">
    <SysSideBar></SysSideBar>
    <SysWinView></SysWinView>
  </div>
</template>

<script setup lang="ts">
  // import SysTopBar from './components/Sys-TopBar.vue';
  import SysSideBar from './components/Main-SideBar.vue'
  import SysWinView from './components/Main-WinView.vue';
  import { router } from './router';
  
  router.replace("/home");
</script>

<style>

  *{
    margin:0;
    padding: 0;
    overflow: hidden;
    --el-color-primary:rgb(254, 144, 76);
    --el-timeline-node-color:rgb(222, 184, 135);
  }
  body{
    position: absolute;
    height: 100%;
    width: 100%;
    /* background-color: blueviolet; */
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

  #main{
    display: flex;
    /* margin-top: 30px; */
    height: 100%;
    width: 100%;
    /* background-color: palegreen; */
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
      background: rgb(255, 255, 255);
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

  .el-tab-pane{
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .collection-page,.el-tabs__content{
    height: 100%;
  }

  .el-pagination{
    margin: 0 auto;
  }


  
</style>



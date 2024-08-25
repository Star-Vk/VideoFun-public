<template>
    <div class="TopbarClass">
        <span class="title">VideoFun</span>
        <div class="control-close" @click="close"></div>
        <div class="control-mini" @click="show"></div>
    </div>
</template>

<script setup lang="ts">
import { mitter } from '@renderer/player';


    // let keyword = ref("");
    // const title = "※";

    function close(){
      mitter.emit("event-player-win-close")
      window.api.emit("event-sys-win-close");
    }
    // function resize(){
    //   window.api.emit("event-sys-win-resize");
    // }
    function show(){
      window.api.emit("event-sys-win-min");
    }
</script>

<style scoped>

.TopbarClass{
    position: relative;
    width: 100%;
    flex: 1;
    /* flex-grow: 0; */
    /* height: 65px; */
    /* line-height: 65px; */
    /* text-align: center; */
    /* position: fixed; */
    position:relative;
    /* right: 0;
    margin:0;
    top:0; */
    background-color: rgb(30, 32, 34);
    -webkit-app-region:drag;
    /* position: fixed; */
    /* border-bottom: 1px #cccc solid; */
    /* border-bottom: #cccc solid 0.5px; */
    /* border-bottom: 0.3px solid purple; */
  }
  
  .title{
    display: block;
    height: 30px;
    font-size: 25px;
    text-align: center;
    line-height: 30px;
    /* background-color: beige; */
    position: absolute;
    user-select: none;
    font-weight: bolder;
    color: grey;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }


  .control-close,.control-resize,.control-mini{
    width: 50px;
    position: absolute;
    right: 0px;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    
    text-align: center;
    height: 40px;
    /* margin-top: calc((75px - 30px)/2); */
    /* line-height: 30px; */
    -webkit-app-region: no-drag;
    background-size: 45% 65%;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;

  }

  .control-close{
    background-image: url("../../../../resources/player-close.png");
  }

  .control-mini{
    right: 65px;
    background-image: url("../../../../resources/player-minimized.png");
  }


  .control-mini:hover,.control-resize:hover{
    background-color: rgb(47, 49, 52);;
    border-radius: 5px;
    cursor:pointer;
  }

  .control-close:hover{
    background-color: rgb(47, 49, 52);
    border-radius: 5px;
    cursor:pointer;
  }
</style>

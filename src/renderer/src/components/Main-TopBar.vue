<template>
    <div class="TopbarClass">
        <span class="icon"></span>
        <span class="title">VideoFun</span>
        <div @keyup.enter="search" class="seach-input">
          <el-input :disabled="store.isLoading" v-model="keyword" style="width: 300px;" placeholder="搜点啥好呢？">
            <template #append>
              <el-button :icon="Search" @click="search" />
            </template>
          </el-input>
        </div>
        <div class="control-close" @click="close"></div>
        <div class="control-resize" ref="topbarResize" @click="resize"></div>
        <div class="control-mini" @click="show"></div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import maxBtn from "../../../../resources/topbar-max-btn.png";
    import minBtn from "../../../../resources/topbar-min-btn.png";
    import { Search } from '@element-plus/icons-vue';
    import { router } from '@renderer/router';
    import { mitter } from '@renderer/main';
    import {useVideoFunStore} from "../store/index"

    const store = useVideoFunStore();

    let keyword = ref("");
    // const title = "※";
    
    let topbarResize:any = ref(null);
    function close(){
      window.api.emit("event-sys-win-close");
    }
    function resize(){
      window.api.emit("event-sys-win-resize");
    }
    function show(){
      window.api.emit("event-sys-win-min");
    }
    async function search(){
      if(keyword.value === ""){
        return;
      }
      // 开启返回按钮
      mitter.emit("event-msg-returnBtn");
      // 切换路由
      if(router.currentRoute.value.fullPath.includes("search")){
        router.replace({path:"/search",query:{keyword:keyword.value}});
      }else{
        router.push({path:"/search",query:{keyword:keyword.value}});
      }
      
      mitter.emit("event-msg-search",keyword.value);
      
      //清空关键词
      keyword.value = ""
    }

    onMounted(() => {
      // console.log(topbarResize.value.style);
      topbarResize.value.style.backgroundImage = `url("${maxBtn}")`;

    
      /* 窗口最小化 */ 
      window.api.on("event-sys-win-min",()=>{
        topbarResize.value.style.backgroundImage = `url("${maxBtn}")`;
      });

      /* 窗口最大化 */ 
      window.api.on("event-sys-win-max",()=>{
        topbarResize.value.style.backgroundImage = `url("${minBtn}")`;
      });
    });
</script>

<style scoped>

.TopbarClass{
    width: 100%;
    flex: 1;
    /* height: 65px; */
    line-height: 65px;
    /* text-align: center; */
    /* position: fixed; */
    position:relative;
    /* right: 0;
    margin:0;
    top:0; */
    background-color: white;
    -webkit-app-region:drag;
    /* position: fixed; */
    /* border-bottom: 1px #cccc solid; */
    border-bottom: #cccc solid 0.5px;
    /* border-bottom: 0.3px solid purple; */
  }

  .TopbarClass > span:first-of-type{
    /* color: black; */
    display: block;
    height: 60px;
    width: 60px;
    font-size: 20px;
    font-weight: bolder;
    /* background-color:#cccc; */
    background-image: url("../../../../resources/icon.png");
    background-size: 100%;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .title{
    position: absolute;
    left: 85px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bolder;
    font-size:35px;
    color: rgb(254,144,76);
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

  .seach-input{
    position: absolute;
    -webkit-app-region: no-drag;
    right: 230px;
    top: 50%;
    transform: translateY(-50%);
  }

  .control-close{
    background-image: url("../../../../resources/topbar-close-btn.png");
  }

  .control-resize{
    right: 65px;
  }

  .control-mini{
    right: 120px;
    background-image: url("../../../../resources/torbar-small-btn.png");
  }


  .control-mini:hover,.control-resize:hover{
    background-color: #cccc;
    border-radius: 5px;
    cursor:pointer;
  }

  .control-close:hover{
    background-color: #cccc;
    border-radius: 5px;
    cursor:pointer;
  }
</style>

<template>
  <div @scroll="handlScroll" id="main-page">
    <HomeVideoEleme v-for="info in store.getRecommendation" :video-info="info" :key="info.id"></HomeVideoEleme>
  </div>
</template>

<script lang="ts" setup>
  import HomeVideoEleme from "@renderer/components/Main-VideoEleme.vue";
  // import { onMounted } from 'vue';
  import {useVideoFunStore} from "../store"

  const store = useVideoFunStore();

  store.setLoading(true);
  
  async function handlScroll(event){
    const {target} = event as {target:Element};
      
    if(Math.ceil(target.scrollTop+target.clientHeight)+50 >= target.scrollHeight){
      store.getRecommendationNextData();
    }
  }
    

  window.api.on("sys-orgin-ready",async ()=>{
    if(store.getResultLength <= 0){
      store.getRecommendationNextData();
    }

  });

  // onMounted(async () => {
  //   console.log("welcome to VideoFun!!!");
  //   store.getNextData();
  // });
</script>

<style scoped>
  #main-page{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow-y: scroll;
    justify-content:space-evenly;
    flex: 1;
    margin-bottom: 10px;
  }
</style>

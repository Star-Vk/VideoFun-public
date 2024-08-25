<template>
  <div class="search">
    <HomeVideoEleme v-for="info in store.searchRes" :video-info="info" :key="info.id"></HomeVideoEleme>
  </div>
</template>

<script lang="ts" setup>
  import HomeVideoEleme from "@renderer/components/Main-VideoEleme.vue";
  import { mitter } from "@renderer/main";
  import { useVideoFunStore } from "@renderer/store";
  // import { VideoType } from "@renderer/type";
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";

  

  // console.log(keyword);
  const store = useVideoFunStore();
  // // 搜索数据
  // store.setResult(await window.api.emit("event-video-search",keyword));
  mitter.on("event-msg-search",async (keyword)=>{
    store.setLoading(true);
    store.setResult(await window.api.emit("event-video-search",keyword));
    store.setLoading(false);
  })


  onMounted(async () => {
    const route = useRoute();
    const {keyword} = route.query;
    store.setLoading(true);
    store.setResult(await window.api.emit("event-video-search",keyword));
    store.setLoading(false);
  });

</script>

<style scoped>

  .search{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow-y: scroll;
    justify-content:space-evenly;
    flex: 1;
    margin-bottom: 10px;
  }
</style>

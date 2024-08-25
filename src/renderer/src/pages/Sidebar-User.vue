<template>
  <div id="user-page">
      <el-timeline style="margin-top: 10px;">
        <el-timeline-item v-for="key in [...store.getHistoryTimeMap.keys()].reverse()" :timestamp="key" :key="key" placement="top">
          <div class="exhibition">
            <HomeVideoEleme v-for="item in store.getHistoryTimeMap.get(key)" :video-info="item" :key="item.id"></HomeVideoEleme>
          </div>
        </el-timeline-item>
      </el-timeline>

  </div>
</template>

<script lang="ts" setup>
import HomeVideoEleme from '@renderer/components/Main-VideoEleme.vue';
import { useVideoFunStore } from '@renderer/store';
import { onMounted } from 'vue';

let store = useVideoFunStore();


//监听历史刷新
window.api.on("event-history-push-refresh",()=>{
  console.log("recv history refresh event and will refresh history");
  store.getHistory();
});

onMounted(() => {
  store.getHistory();
});

</script>

<style scoped>
#user-page {
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* margin: 0 auto; */
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  /* margin-left:10%; */
  width: 95%;
  height: 96%;
  overflow-y: scroll;
  /* justify-content:space-evenly; */
  /* flex: 8; */
  /* background-color: orange; */
  /* margin-bottom: 10px; */
}

.exhibition{
  display: flex;
  flex-wrap: wrap;
  /* background-color: purple; */
  /* width: 100%; */
  /* overflow-y: scroll; */
  /* justify-content:space-between; */
  /* margin-bottom: 10px; */
}

.exhibition > div{
  margin-left: 5%;
}
</style>

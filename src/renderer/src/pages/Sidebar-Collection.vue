<template>
  <div id="collection-page">
    <el-tabs v-model="activeName" style="width: 100%;height:100%" stretch class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="n in listName" :key="n" :label="n" :name="n">
        <div style="height: 100%;">
          <div ref="collection" class="exhibition">
            <HomeVideoEleme v-for="info in store.getCurrentClassList" :video-info="info" :key="info.id"></HomeVideoEleme>
          </div>
        </div>
        <el-pagination v-model:current-page="page" layout="prev, pager, next" :total="1000" />
        <div class="pagination">
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import {onMounted} from "vue";
  import {useVideoFunStore} from "../store/index"
  import { watch } from "vue";
  import HomeVideoEleme from "@renderer/components/Main-VideoEleme.vue";

  let activeName = ref("");
  let listName = ref<Array<string>>([]);
  let store = useVideoFunStore();
  let page = ref(1);
  let collection = ref<HTMLDivElement[]>();

  
  watch(activeName,(newVal:string)=>{
    page.value = 1;
    store.setCurrentClassList(newVal,page.value);
    collection.value?.map(item=>{
      item.scrollTo({left:0,top:0});
    })
  });

  watch(page,(newVal)=>{
    store.setCurrentClassList(activeName.value,newVal);
    collection.value?.map(item=>{
      item.scrollTo({left:0,top:0});
    })
  })

  function handleClick(){

  }

  onMounted(async () => {
    listName.value = await window.api.emit("event-video-get-classListName");
    activeName.value = listName.value[5];
    console.log(listName.value);
  });

</script>

<style scoped>
  #collection-page{
    /* background-color: orange; */
    /* display: flex; */
    flex-wrap: wrap;
    width: 100%;
    user-select: none;
    height: 100%;
    flex-direction: column;
    /* overflow-y: scroll; */
    /* justify-content:space-evenly; */

    /* background-color: orange; */
    flex: 8;
    margin-bottom: 10px;
  }

  .exhibition{
    display: flex;
    flex-wrap: wrap;
    /* position: absolute; */
    /* background-color: purple; */
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    justify-content:space-evenly;
    flex: 1;
    margin-bottom: 10px;
  }

  .pagination{
    height: 10%;
  }
</style>
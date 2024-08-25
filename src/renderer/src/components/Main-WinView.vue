<template>
  <div id="WinVue">
    <SysTopBar></SysTopBar>
    <div class="view" v-loading="store.loading" element-loading-text="玩命加载中ing...">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>  

  </div>
</template>

<script lang="ts" setup>
    import SysTopBar from './Main-TopBar.vue';
    import {useVideoFunStore} from "../store"


    const store = useVideoFunStore();


</script>

<style>
    #WinVue{
        display: flex;
        flex-direction: column;
        flex: 50;
        height: 100%;
        /* position: relative; */
        /* background-color: purple; */
    }

    .view{
      display: flex;
      position: relative;
      flex: 8;
      overflow: hidden;
      height: 100%;
      /* background-color: orange; */
    }
</style>

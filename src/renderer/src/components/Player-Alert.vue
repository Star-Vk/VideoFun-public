<template>
  <div v-if="open" id="Alert">
    <div class="card">
      <el-card style="width: 380px;background-color: black;height: 200px;position: absolute">
          <div class="msg">
            <p style="color: white;">{{ title }}</p>
          </div>
          <div class="confirm-btn">
            <el-button @click="confirm" style="background-color: black;" plain>确认</el-button>
          </div>
          <div class="cancel-btn">
            <el-button @click="cancel" style="background-color: black;" plain>取消</el-button>
          </div>
    </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mitter } from '@renderer/player';
import { ref } from 'vue';

  let open = ref(false);
  let title = ref("");
  let func = ()=>{};

  mitter.on("event-alert-show",(obj:any)=>{
    title.value = obj.title;
    open.value = true;
    func = obj.func;
  })
  function confirm(){
    open.value = false;
    func();
    func = ()=>{};
  };

  function cancel(){
    open.value = false;
  }
</script>


<style scoped>

    #Alert{
      position: fixed;
      width: 100%;
      background-color: rgba(0, 0, 0,0.5);
      height: 93.8%;
      /* box-shadow: 
      30px 30px 60px #000,
      -30px -30px 60px #000; */
      /* left: 50%; */
      bottom: 0px;
      /* top:100%; */
      /* transform: translateX(-50%) translateY(-50%); */
      z-index:3000;
    }

    .card{
      position: absolute;
      height: 200px;
      width: 400px;
      /* background-color: rgba(20, 20, 20,1); */
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .msg{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      /* background-color: #fff; */
    }

    .confirm-btn{
      position: absolute;
      bottom: 15px;
      right: 15px;
    }

    .cancel-btn{
      position: absolute;
      bottom: 15px;
      right: 85px;
    }

</style>
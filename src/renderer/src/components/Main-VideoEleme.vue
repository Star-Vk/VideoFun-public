<template>
  <div @click="play" id="video-eleme">
    <div class="exhibit-img" :style="{backgroundImage:`url(${videoInfo.picUrl})`}"></div>
    <div class="video-msg">
        <span class="video-name">{{ videoInfo.name }}</span>
        <span class="video-orgin">{{ `[${videoInfo.id.split("-")[0]}]`+videoInfo.orgin }}
            <span class="video-time">{{ videoInfo.time }}</span>
        </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import {VideoType} from "../type";
    const {videoInfo} = defineProps<{videoInfo:VideoType}>();

    function play(){
        window.api.emit("event-video-play",JSON.stringify(videoInfo));
    }

</script>

<style scoped>
    #video-eleme{
        /* flex-basis: calc(25% - 30px); */
        height: 250px;
        width: 250px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        /* background-color: black; */
        /* border:1px grey solid; */
        margin-top: 10px;
        transition: 0.2s;
        cursor: pointer;
        /* box-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.5); */
    }

    #video-eleme:hover{
        transform: scale(1.04);
        color: orange;
        font-weight: bolder;
    }

    .exhibit-img{
        /* background-color: pink; */
        background-size: 100%;
        border-image: url("../../../../resources/image-loading-failed.png");
        background-repeat: no-repeat;
        border-radius: 5%;
        flex:8;
    }

    .video-msg{
        /* background-color: grey; */
        /* opacity: 0.8; */
        position: relative;
        flex:5;
    }

    /* .video-msg >span{
        display: block;
    } */

    .video-name{
        display: block;
        font-size: 14px;
        text-align: center;
        font-weight: bolder;
        /* background-color: purple; */
        width: 95%;
        margin: 0 auto;
        /* margin-top: 3px; */
        line-height: 45px;
        height: 45px;
    }

    .video-orgin{
        font-size: 12px;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bolder;
        background-color: rgb(255, 240, 227);
        display: inline-block;
        padding: 2px;
        border-radius: 15%;
        color: rgb(255, 127, 36);
    }

    .video-time{
        /* position: absolute; */
        /* background-color: pink; */
        font-size: 12px;
        color:rgb(148, 153, 163);
        font-weight: 500;
        /* bottom: 0px; */
        /* left:0px; */
    }
</style>

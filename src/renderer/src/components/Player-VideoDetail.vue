<template>
    <div :style="{flex:visible?3:0}" id="video-detail">
            <div class="draw-view">
                <div class="detail">
                    <div class="msg">
                        <div class="img" :style="{ backgroundImage: `url(${videoMsg.picUrl})` }"></div>
                        <div class="detail-msg">
                            <div class="title">{{ videoMsg.name }}</div>
                            <div class="type">类型：{{ videoMsg.type }}</div>
                            <div class="status">状态：{{ videoMsg.orgin }}</div>
                            <div class="time">时间：{{ videoMsg.time }}</div>
                        </div>
                    </div>
                    <div class="describe">
                        {{ videoMsg.desc }}
                    </div>
                </div>
                <div class="episode">
                    <el-tabs type="border-card" :stretch="true" v-model="activeName" style="border-radius: 5%;border: none;" @tab-click="handleClick">
                        <el-tab-pane  class="test" v-for="(episode, index) in videoMsg.playUrl" :key="index" :label="`源${index + 1}`"
                            :name="`源${index + 1}`">
                            <div class="epi">
                                <div :class="{'item-active':episodeChoose===item.url}" @click="chooseEpisode(item,index)" class="item" v-for="(item, index) in episode"
                                :key="index">{{ item.title }}
                            </div>
                        </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsPaneContext } from "element-plus";
import imgLoadingFailed from "../../../../resources/image-loading-failed.png"

import { mitter } from '@renderer/player';


type videoType = {
    id: string,
    name: string,
    orgin: string,
    time: string,
    picUrl: string,
    playUrl: {
        title: string;
        url: string;
    }[][],
    type: string,
    desc: string,
}

let episodeChoose = ref('');
let activeName = ref<string>(`源1`);
let visible = ref(true);
let playMsg = ref<{title:string,url:string,index:number}>({title:"",url:"",index:0})
let videoMsg = ref<videoType>({
    id: "",
    name: "",
    orgin: "",
    time: "",
    picUrl: imgLoadingFailed,
    playUrl: new Array<Array<{ title: string, url: string }>>,
    type: "",
    desc: "",
});
function handleClick(tab: TabsPaneContext, event: Event) {
    event;
    console.log(tab);
}

function isM3u8(url:string){
    return /\.m3u8$/.test(url);
}

function isPlayResource(url:string){
    return /\.(mp4|mov|ogg|webm|avi|flv)$/.test(url);
}

function chooseEpisode(episode: { title: string; url: string; },index:number) {
    episodeChoose.value = episode.url;
    playMsg.value.title = episode.title;
    playMsg.value.url = episode.url;
    playMsg.value.index = index;

    if(!isM3u8(episode.url) && !isPlayResource(episode.url)){
        mitter.emit("event-alert-show",{
            title:"链接似乎是非可直接播放资源，即将用浏览器打开",
            func:()=>{
                window.api.emit("event-open-external",episode.url);
            }
        });
        
        return;
    }
    mitter.emit("event-video-play", episode);
}

mitter.on("event-player-win-close",()=>{
    if(playMsg.value.title === "") return;
    window.api.emit("event-history-push",JSON.stringify({
        ...(videoMsg.value),
        playMsg:{
            episodeName:playMsg.value.title,
            episode:playMsg.value.index,
            time:new Date().getTime()
        }
    }))
})

mitter.on("event-drawer-switch",()=>{
    visible.value = !visible.value
});

mitter.on("event-play-error",()=>{
    episodeChoose.value = "";
    visible.value = true;
})

window.api.on("event-video-play", (_, video) => {
    visible.value = true;
    videoMsg.value = JSON.parse(video) as videoType;
    videoMsg.value.desc = videoMsg.value.desc === "" ? "暂无介绍" : videoMsg.value.desc;
    mitter.emit("event-player-clear");
    console.log("recv videoMsg -> ", videoMsg.value);
});

</script>

<style scoped>

#video-detail {
    overflow-y: scroll;
    position: relative;
    background-color: rgb(20, 20, 20);
    flex: 3 ;
    user-select: none;
    transition: 0.5s;
}

.detail {

    /* background-color: blueviolet; */
    border-bottom: 2px solid rgb(30, 32, 34);
}

.msg {
    /* background-color: blue; */
    flex: 5;
    display: flex;
    border-bottom: 2px solid rgb(30, 32, 34);
}

.img {
    /* background-color: pink; */
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('https://ac.migu66.com/xiguauploads/allimg/240804/8b34e9ea278b78eb.jpg');
    flex: 4
}

.detail-msg {
    /* background-color: orange; */
    flex: 8;
    margin-bottom: 30px;
}

.title {
    text-align: center;
    font-weight: bolder;
    margin-top: 15px;
    font-size: 20px;
    color: rgb(231, 233, 235);
}

.type,
.status,
.time {
    font-size: 12px;
    margin-top: 15px;
    margin-left: 20px;
    color: rgb(231, 233, 235);
}

.describe {
    /* background-color: purple; */
    /* display: flex;
    align-items: center;
    justify-content: center; */
    font-size: 13px;
    color: rgb(231, 233, 235);
    padding: 20px;
    margin: 0 auto;
    /* overflow-y: scroll; */
    /* height: 200px; */

    /* padding-top: 30px; */
    /* margin-top: 10px; */
    /* text-align: center; */
}

.current-msg{
    text-align: center;
    color: white;
    margin-top: 20px;
    font-size: 20px;
    font-weight:bolder;
    color:rgb(222, 184, 135);
}

.episode {
    margin: 0 auto;
    
    margin-top:20px;
    margin-bottom: 100px;
    width: 90%;
    height: 100%;
    /* background-color: rgb(35, 37, 39); */

    border-radius: 3%;
    flex-direction: column;
}

.epi{
    height: 210px;
    overflow-y: scroll;
    overflow-x: hidden;
    /* height: 100%; */
    /* background-color: purple; */
    
}


.item {
    height: 30px;
    margin: 0 auto;
    /* margin-top: 10px; */
    /* margin-bottom: 10px; */
    line-height: 30px;
    /* background-color: rgb(25, 26, 32); */
    cursor: pointer;
    font-size: 14px;
    font-weight: bolder;
    text-align: center;
    /* padding-left: 12px; */
    width: 100%;
    color: white;
    transition: 0.3s;
    /* border-radius: 18%; */
    /* border: 1px solid white; */
}

.item:hover{
    background-color: rgba(255, 190, 87,0.3);
    color: rgb(254, 144, 76);
}

.item-active{
    background-color: rgba(255, 190, 87,0.3);
    color: rgb(254, 144, 76);
}

.draw-view{
    /* padding-left: 20px; */
    /* padding-right: 20px; */

    margin-top:20px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

</style>

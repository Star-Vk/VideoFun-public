<template>
    <div id="side-bar">
        <div>
            <span v-if="returnBtn" class="return-btn" @click="back"></span>
            <span v-else="!returnBtn" class="version-show" >V1.0</span>
        </div>
        <div>
            <div class="side-menu">
                <div class="sidebar-item"
                    v-for="item in sidebar"
                    @click="choose(item)" 
                    :class="{'side-active':choice===item.title && !returnBtn}"
                    :key="item.path">
                    <span class="img-icon" 
                        :style="{backgroundImage:`url('${(choice===item.title && !returnBtn)?item.activeIcon:item.icon}')`}" >
                    </span>
                    <span class="item-title"
                        :style="{color:`${(choice===item.title && !returnBtn)?'#deb887':'rgb(154, 158, 160)'}`}"
                    >{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="topbar-bottom">
            <span :class="{'setting-active':choice==='setting'}" @click="setting" class="setting"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { router } from '@renderer/router';
    import { ref } from 'vue';
    import {mitter} from "../main";
    import mainPageIcon from "../../../../resources/mainPage.png";
    import mainPageIconActive from "../../../../resources/mainPage-active.png";
    import favouriteIcon from "../../../../resources/favourite.png";
    import favouriteIconActive from "../../../../resources/favourite-active.png";
    import historyIcon from "../../../../resources/history.png";
    import historyIconActive from "../../../../resources/history-active.png";

    const sidebar = [
        {
            title:"推荐",
            icon:mainPageIcon,
            activeIcon:mainPageIconActive,
            path:"/home"
        },
        {
            title:"分类",
            icon:favouriteIcon,
            activeIcon:favouriteIconActive,
            path:"/Collection"
        },
        {
            title:"历史",
            icon:historyIcon,
            activeIcon:historyIconActive,
            path:"/User"
        }
    ];


    let choice = ref(sidebar[0].title);
    let returnBtn = ref(false);

    mitter.on("event-msg-returnBtn",(_)=>{
        returnBtn.value = true;
    })
    

    function choose(t){
        choice.value = t.title;
        returnBtn.value = false;
        router.replace(t.path);
    }

    function setting(){
        choice.value = "setting";
        returnBtn.value = false;
        router.replace("/Setting");
    }

    function back(){
        router.back();
        returnBtn.value = false;
    }
</script>

<style scoped>
    #side-bar{
        flex:3;
        flex-direction: column;
        display: flex;
        height: 100%;
        
        background-color: rgb(246, 247, 248);
    }

    #side-bar >div:first-of-type{
        flex: 1;
        -webkit-app-region:drag;
        /* border-bottom: 0.5px solid #cccc; */
        /* width: 100%; */
        /* background-color: pink; */
    }

    .return-btn{
        -webkit-app-region: no-drag;
        display: block;
        margin: 0 auto;
        transform: translateY(50%);
        background-image: url('../../../../resources/return-disabled.png');
        /* background-color: rgb(227, 229, 231); */
        cursor:pointer;
        background-size: 100%;
        width: 30px;
        height: 30px;
        margin-top: 20px;
        /* background-color: purple; */
        /* border-radius: 50%; */
    }

    .version-show{
        display: block;
        user-select: none;
        font-weight: bolder;
        -webkit-app-region: no-drag;
        text-align: center;
        /* background-color: purple; */
        margin: 0 auto;
        transform: translateY(50%);
        margin-top: 20px;
    }


    #side-bar >div:nth-last-of-type(2){
        -webkit-app-region:drag;
        flex: 8;
        position: relative;
        /* display: flex; */
        /* width: 100%; */
        /* background-color: green; */
    }


    .side-menu{
        
        display: flex;
        position: absolute;
        height: 55%;
        width: 80%;
        margin-top: 35px;
        /* background-color: red; */
        justify-content:space-evenly;
        margin-left:10%;
        cursor:pointer;
        flex-direction: column;
    }



    .sidebar-item{
        -webkit-app-region: no-drag;
        height: 45px;
        position: relative;
        text-align: center;
        /* line-height: 50px; */
        user-select: none;
        left: 50%;
        transform: translateX(-50%);
        /* background-color: purple; */
        width: 28px;
        transition: 0.5s;
    }

    .img-icon{
        background-size:100%;
        background-repeat: no-repeat;
        position: absolute;
        height: 52px;
        width: 100%;
        left:0px;
        top: 0px;
        /* background-color: blue; */
    }

    .item-title{
        position: absolute;
        color: grey;
        width: 100%;
        left: 0;
        bottom: 0;
        font-size: 13px;
        /* background-color: green; */
    }

    



    .side-menu >span:active{
        transform: scale(0.5);
    }

    .side-active{
        /* background-color: white; */
        font-weight: bolder;
        border-radius: 5px;
        
        color: #deb887;
    }

    .topbar-bottom{
        flex:2;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        /* background-color: orange; */
    }

    .setting{
        /* flex: 1; */
        height: 35px;
        width: 35px;
        /* background-color: black; */
        background-image: url("../../../../resources/setting.png");
        -webkit-app-region: no-drag;
        background-size: 75%;
        background-repeat: no-repeat;
        background-position: center;
        cursor:pointer;
        transition: 0.5s;
    }

    .setting:active{
        transform: scale(0.5);
    }

    .setting-active{
        background-image: url("../../../../resources/setting_active.png");
        /* background-color: white; */
        border-radius: 5px;
    }
</style>

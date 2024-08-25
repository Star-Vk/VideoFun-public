import { HistoryType, VideoType } from '@renderer/type'
import { defineStore } from 'pinia'

function getTime(timestamp:number){
  let d = new Date(timestamp);
  return `${d.getFullYear()} / ${d.getMonth()+1} / ${d.getDate()}`
}

export const useVideoFunStore = defineStore('VideoFun', {
  state:()=>{
    return {
        searchResult:new Array<VideoType>,
        recommendation:new Array<VideoType>,
        isLoading:false,
        viewStatus:"主页",
        index:1,
        classList:new Array<string>,
        currentClassList:new Array<VideoType>,
        history:new Array<HistoryType>,
    }
  },
  getters:{
    searchRes:(state) => state.searchResult,
    loading:(state) => state.isLoading,
    getViewStatue:(state) => state.viewStatus,
    getResultLength:(state) => state.searchResult.length,
    getRecommendation:(state) => state.recommendation,
    getRecommendationLength:(state) => state.recommendation.length,
    getCurrentClassList:(state) => state.currentClassList,
    getCurrentClassListLength:(state) => state.currentClassList.length,
    getHistoryTimeMap:(state)=>{
      let map = new Map<string,HistoryType[]>();
      state.history.forEach(item=>{
        let date = getTime(item.playMsg.time)
        if(map.has(date)){
          map.get(date)?.push(item);
        }else{
          map.set(date,new Array<HistoryType>);
          map.get(date)?.push(item);
        }
      });

      return map;
    }
  },
  actions:{
    setResult(newResult:VideoType[]){
      this.searchResult = newResult;
      console.log("set search result -> ",this.searchResult);
    },
    setLoading(state:boolean){
      this.isLoading = state;
      console.log("set loading -> ",this.searchResult);
    },
    setView(state:string){
      this.viewStatus = state;
    },
    setRecommendation(newResult:VideoType[]){
      this.recommendation = newResult;
      console.log("set recommendation result -> ",this.recommendation);
    },
    async getRecommendationNextData(){
      this.setLoading(true);
      this.setRecommendation(await window.videoApi.getRecommendation(40 * this.index));
      this.setLoading(false);
      if(this.getRecommendationLength !== 0)
        this.index++;
    },
    async setCurrentClassList(name:string,page = 1){
      this.setLoading(true);
      this.currentClassList = await window.api.emit("event-video-get-class",name,page);
      console.log("set currentClassList result -> ",this.currentClassList);
      this.setLoading(false);
    },
    async getHistory(){
      this.history = await window.api.emit("event-history-get");
      console.log("get history -> ",this.history);
    },
    async pushHistory(video:HistoryType){
      console.log("add history -> ",video);
      //添加
      window.api.emit("event-history-push",video);
      //刷新
      await this.getHistory();
    },
    async clear(){
        //添加
        window.api.emit("event-history-clear");
        console.log("clear history");
        //刷新
        await this.getHistory();
    }
  }
})
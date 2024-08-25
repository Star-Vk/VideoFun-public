import { createPinia } from "pinia";

export interface VideoType{
    id:string,
    name:string,
    orgin:string,
    time:string,
    picUrl:string,
    playUrl:{
      title:string,
      url:string
    }[][],
    type:string,
    desc:string,
  }


export interface HistoryType extends VideoType {
  playMsg:{
      episodeName:string,
      episode:number,
      time:number
  }
}

export const pinia = createPinia();
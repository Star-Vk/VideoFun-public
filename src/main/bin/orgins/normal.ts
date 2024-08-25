import { Orginal, videoType } from "./orgin";



export default class Normal extends Orginal{
    //资源列表 表示请求以下接口获取资源
    orgins: { name: string; url: string; }[] = [];
    //分类列表 渲染进程分类页需要获取这个列表来渲染数据
    classList: string[] = [];

    constructor(){
        super();
    }

    //获取推荐页的视频列表，默认为当前源
    async getRecommendation(orgins:Array<{name:string,url:string}> = this.orgins){
      return new Array<videoType>;
    }


    //根据关键词搜索视频列表，默认为当前源
    async search(keyword:string,orgins:Array<{name:string,url:string}> = this.orgins){
      return new Array<videoType>;
    }

    //根据分类和页数获取，视频列表
    async getClassList(listName:string,page:number,orgins:Array<{name:string,url:string}> = [{
        "name":"360",
        "url":"https://360zy.com/api.php/provide/vod/from/360m3u8/at/json"
    }]):Promise<videoType[]>{
      return new Array<videoType>;
    }
}
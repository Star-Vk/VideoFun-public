import { BrowserWindow } from "electron"
import { logger } from ".."
import { Tools } from "../../utils/Tools";
import history from "../../../../resources/data/history.json?commonjs-external&asset"
import fs from "fs";

export type videoType = {
    id:string,
    name:string,
    orgin:string,
    time:string,
    picUrl:string,
    playUrl:{
        title: string;
        url: string;
    }[][],
    type:string,
    desc:string,
}

export type HistoryType = {
    id:string,
    name:string,
    orgin:string,
    time:string,
    picUrl:string,
    playUrl:{
        title: string;
        url: string;
    }[][],
    type:string,
    desc:string,
    playMsg:{
        episodeName:string,
        episode:number,
        time?:number,
    }
}

export type OrginType = {
    name:"",
    orgins:Array<{
        name:string,
        url:string,
        header?:any
    }>,
    doWith:{
        getRecommendation:(orgins:Array<{name:string,url:string}>)=>Promise<videoType[]>,
        search:(orgins:Array<{name:string,url:string}>)=>Promise<videoType[]>
    }
}

export abstract class Orginal{
    static readonly REQUEST_TIMEOUT = 1000 * 7;
    static orginsMap = new Map<string,Orginal>;
    static recommendList = new Array<videoType>;
    static history:HistoryType[] = new Array<HistoryType>;

    name:string = "Normal";
    abstract classList:Array<string>;

    abstract orgins:Array<{name:string,url:string}>;

    static add(orgins:Orginal){
        Orginal.orginsMap.set(orgins.name,orgins);
    }

    static getOrinal(name:string="Normal"){
        let o = this.orginsMap.get(name);
        return o;
    }

    static async init(win:BrowserWindow){

        let Normal = await import("./normal");
        let normal = new Normal.default();
        Orginal.add(normal);
        
        /* 调试代码 */
        logger.debug("get recommendation ....");
        Orginal.recommendList = await normal.getRecommendation();
        Tools.shuffleArray(Orginal.recommendList);
        
        try{
            logger.debug("loading history file");
            
            let h = fs.readFileSync(history,{encoding:"utf-8"});
            Orginal.history = JSON.parse(h);
        }catch(err){
            logger.err("failed to load history");
        }
        win.webContents.send("sys-orgin-ready");
        
    }

    static pushHistory(video:HistoryType){
        Orginal.history.push(video);
    }

    abstract getRecommendation(orgins?:Array<{name:string,url:string}>):Promise<videoType[]>;
    abstract  search(keyWord:string,orgins?:Array<{name:string,url:string}>):Promise<videoType[]>;
    abstract getClassList(listName:string,page:number,orgins?:Array<{name:string,url:string}>):Promise<videoType[]>;
}
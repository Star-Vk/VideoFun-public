import { ipcMain } from "electron";
import { Orginal, videoType } from "./orgins/orgin";
import { WinManager } from "./winManager";
import { PlayerConfig } from "./winConfig";
import { logger } from ".";

export function mountUserEvent(){
    logger.log("mountUserEvent");
    
    ipcMain.handle("event-video-recommendation",(_,number = 40)=>{
        return Orginal.recommendList.slice(0,number);
    });

    ipcMain.handle("event-video-search",(_,keyWord:string)=>{
        let orginal = Orginal.getOrinal();
        if(!orginal){
            return [];
        }

        return orginal.search(keyWord);
    });

    ipcMain.handle("event-video-play",(_,video:videoType)=>{

        const playerWindow = WinManager.windowsMap.get("playerWindow");
        if(!playerWindow){
            WinManager.CreateWindow(PlayerConfig,(win)=>{
                win.webContents.send("event-video-play",video);
            });
        }else{
            playerWindow.webContents.send("event-video-play",video);
            playerWindow.show();
        }
    })

    ipcMain.handle("event-video-get-class",(_,name,index)=>{
        let orgin = Orginal.getOrinal();
        if(!orgin) return [];

        return orgin.getClassList(name,index);
    });

    ipcMain.handle("event-video-get-classListName",(_)=>{
        let orgin = Orginal.getOrinal();
        if(!orgin) return [];
        return orgin.classList;
    });

    ipcMain.handle("event-history-get",()=>{
        logger.debug("get history");
        return Orginal.history;
    });

    ipcMain.handle("event-history-push",(_,video:string)=>{
        let win = WinManager.findWinByName("mainWindow");
        if(!win) logger.warn("update history but not found the window wicth send this request.")
        
        logger.debug("push history");
        Orginal.pushHistory(JSON.parse(video));

        
        win?.webContents.send("event-history-push-refresh");
    });

    ipcMain.handle("event-history-clear",()=>{
        logger.debug("clear history");
        Orginal.history = [];
    })
    
}
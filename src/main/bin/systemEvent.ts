import { app, BrowserWindow, ipcMain, shell } from "electron";
import { WinManager } from "./winManager";
import fs from "fs";
import history from "../../../resources/data/history.json?commonjs-external&asset";
import { Orginal } from "./orgins/orgin";
import { logger } from ".";

export function mountSystemEvent(win:BrowserWindow){
    
    //监听窗口大小发生变化
    win.on("resize",()=>{
        if (!win.isMaximized())
            win.webContents.send("event-sys-win-min");
    });

    win.on("maximize",()=>{
        win.webContents.send("event-sys-win-max");
    });

    win.on("close",()=>{
        const mainWin = WinManager.findWinByName("mainWindow");
        const processId = win.webContents.getProcessId();
        if(mainWin?.webContents.getProcessId() === processId){
            try{
                logger.log("save history now.")
                fs.writeFileSync(history,JSON.stringify(Orginal.history));
                app.quit();
            }catch(err:any){
                logger.err("failed to save history.",err.message);
            }

        }else{
            WinManager.delWin(win.webContents.getProcessId());
        }
    })
}

//窗口最大最小化事件
ipcMain.handle("event-sys-win-resize",(event:Electron.IpcMainInvokeEvent)=>{
    const win = WinManager.findWindowFromEvent(event);
    if (win?.isMaximized()) { // 为true表示窗口已最大化
        win.restore();// 将窗口恢复为之前的状态.
        return "icon--zuidahua iconfont";
        
    } else {
        win?.maximize();
        return "icon--zuixiaohua iconfont";
    }
});
//窗口最小化事件
ipcMain.handle("event-sys-win-min",(event:Electron.IpcMainInvokeEvent)=>{
    const win = WinManager.findWindowFromEvent(event);
    win?.minimize();
});
//窗口关闭
ipcMain.handle("event-sys-win-close",(event:Electron.IpcMainInvokeEvent)=>{
    const win = WinManager.findWindowFromEvent(event);
    win?.close();
});
//打开外部url
ipcMain.handle("event-open-external",(_,url)=>{
    shell.openExternal(url);
})
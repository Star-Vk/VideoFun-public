import { BrowserWindow } from "electron";
import { is } from '@electron-toolkit/utils';
import { join } from "path";
import { logger } from ".";

export interface WinConfigType extends Electron.BrowserWindowConstructorOptions{
    name:string
    loadUrl?:string,
    loadFile?:string,
    readyCallback:(mainWin:BrowserWindow)=>void
}

export class WinManager{
    static windowsMap = new Map<string,BrowserWindow>();

    static CreateWindow(winConfig:WinConfigType,finishCallback = (_:BrowserWindow)=>{}){
        const win = new BrowserWindow(winConfig);
        
        win.on('ready-to-show', () => {
            winConfig.readyCallback(win);
            finishCallback(win);
        });
        
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}${winConfig.loadUrl}`);
        } else {
            win.loadFile(join(__dirname, `../renderer${winConfig.loadFile}`))
        }

        WinManager.windowsMap.set(winConfig.name,win);
        logger.debug("create window(ProcessId):",win.webContents.getProcessId())
        return win;
    }

    static findWinByProcessId(id:number){
        let win = [...WinManager.windowsMap.values()].filter((item)=>{
            return item.webContents.getProcessId() === id;
        });

        if(win.length >= 0){
            return win[0];
        }else{
            return null;
        }
    }

    static findWindowFromEvent(event:Electron.IpcMainInvokeEvent){
        return WinManager.findWinByProcessId(event.processId);
    }

    static delWin(processId:number){
        
        let aim:string = "";
        for(const [key,value] of WinManager.windowsMap){
            if(value.webContents.getProcessId() === processId){
                aim = key;
            }
        }

        logger.debug(`${aim} is closed(processId:${processId})`);
        return WinManager.windowsMap.delete(aim);
    }

    static findWinByName(name:string){
        return WinManager.windowsMap.get(name);
    }
}
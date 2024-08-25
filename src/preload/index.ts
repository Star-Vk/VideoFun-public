import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { WinConfig } from './pageConfig';

// Custom APIs for renderer
const api = {
  emit:async (msg,...args) =>{
    if(!args){
      args = [];
    }
    let result = await ipcRenderer.invoke(msg,...args);
    return result;
  },
  on:(title,callback)=>{
    ipcRenderer.on(title,(event,...args)=>{
      callback(event,...args);
    })
  },
}

const videoApi = {
  getRecommendation:(sum:number)=>{
    return api.emit("event-video-recommendation",sum);
  },
  search(word:string){
    return api.emit("event-video-search",word);
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('WinConfig', WinConfig)
    contextBridge.exposeInMainWorld('videoApi', videoApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
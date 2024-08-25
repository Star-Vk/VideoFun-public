import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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

const torbarHandle = {
  close:()=>api.emit("event-sys-win-close"),
  resize:()=>api.emit("event-sys-win-resize"),
  minimized:()=>api.emit("event-sys-win-min")
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('topbar', torbarHandle);

  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
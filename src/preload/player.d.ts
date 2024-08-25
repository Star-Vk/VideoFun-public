import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI,
    api: {
      emit:(msg,...args) =>Promise<any>;
      on:(title,callback) =>void;
    },
    topbar:{
        close:()=>void,
        resize:()=>void,
        minimized:()=>void,
    }
  }
}
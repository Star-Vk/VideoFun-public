import { ElectronAPI } from '@electron-toolkit/preload'
import {WinConfig,WinConfigType} from "./pageConfig";
import { SideBarPageType } from './sidebarPageConfig';
import {videoType} from "../main/bin/orgins/orgin"

declare global {
  interface Window {
    electron: ElectronAPI,
    WinConfig:WinConfigType,
    api: {
      emit:(msg,...args) =>Promise<any>;
      on:(title,callback) =>void;
    },
    videoApi:{
      getRecommendation:(sum:number)=>Promise<Array<videoType>>
      search:(word:string)=>Promise<Array<videoType>>
      
    },
  }
}

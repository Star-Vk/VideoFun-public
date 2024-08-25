import { join } from 'path'

import { WinConfigType } from './winManager'
import { logger } from '.';
import { Orginal } from './orgins/orgin';
import { mountSystemEvent } from './systemEvent';
import { mountUserEvent } from './userEvent';
import { ico } from '..';

export const MainConfig:WinConfigType = {
    name:"mainWindow",
    width:1180,
    height:720,
    minHeight:720,
    minWidth:1180,
    show: false,
    autoHideMenuBar: false,
    titleBarStyle:"hidden",
    ...(process.platform === 'linux' ? { icon:ico } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity:false,
      nodeIntegrationInWorker: true
    },
    loadUrl:"/",
    loadFile:"\\index.html",
    readyCallback:(win)=>{
        logger.debug("loading orgins....");
        Orginal.init(win);
      
        logger.debug("loding main system event....");
        mountSystemEvent(win);
      
        logger.debug("loading user event....");
        mountUserEvent();

        win.setIcon(ico);

        win.show();
    }
}

export const PlayerConfig:WinConfigType = {
    name:"playerWindow",
    width:1180,
    height:720,
    minHeight:720,
    minWidth:1180,
    // maxHeight:720,
    // maxWidth:1180,
    show: false,
    autoHideMenuBar: false,
    titleBarStyle:"hidden",
    ...(process.platform === 'linux' ? { icon:ico } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/player.js'),
      sandbox: false,
      webSecurity:false,
      nodeIntegrationInWorker: true,
    },
    loadUrl:"/player.html",
    loadFile:"\\player.html",
    readyCallback:(win)=>{
        logger.debug("loding player system event....");
        mountSystemEvent(win);

        // win.webContents.openDevTools();
        win.setIcon(ico);
        win.show();
    }
}
import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico?asset'
import { logger } from './bin'

import { WinManager } from './bin/winManager'
import { MainConfig } from './bin/winConfig'

logger.exception = [];
logger.log("Welcome to VideoFun!!!!");

export const ico = icon;
export let mainWindow:BrowserWindow;
export let videoWindow:BrowserWindow;

app.whenReady().then(() => {

  electronApp.setAppUserModelId('com.VideoFun')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  WinManager.CreateWindow(MainConfig);
  // WinManager.CreateWindow(PlayerConfig);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) WinManager.CreateWindow(MainConfig);
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


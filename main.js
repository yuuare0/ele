const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron' + (process.platform === "win32" ? ".cmd" : ""))
});

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('renderer/html/index.html');
}

app.whenReady().then(() => {
  serverProcess = exec('npx nodemon backend/server.js');

  serverProcess.stdout.on('data', (data) => {
    console.log(`[server]: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[server-error]: ${data}`);
  });

  createWindow();
});

app.on('will-quit', () => {
  if (serverProcess) serverProcess.kill();
});


ipcMain.on('toMain', (event, arg) => {
  console.log('메인 프로세스가 받은 데이터:', arg);

  // 렌더러 프로세스로 응답 보내기
  event.sender.send('fromMain', '메인에서 응답했어요!');
});
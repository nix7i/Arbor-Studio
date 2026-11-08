const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let splash, win;

function start() {
  splash = new BrowserWindow({ width: 420, height: 300, frame: false, resizable: false,
                               alwaysOnTop: true, backgroundColor: '#000000' });
  splash.loadFile('splash.html');

  win = new BrowserWindow({ width: 1500, height: 900, show: false,
                            backgroundColor: '#000000', autoHideMenuBar: true });
  win.loadFile('index.html');
  win.once('ready-to-show', () => {
    setTimeout(() => { splash.close(); win.show(); }, 1500); // keep splash visible briefly
  });
}

function setupUpdates() {
  if (!app.isPackaged) return;               // skip when running with `npm start`
  autoUpdater.on('update-downloaded', async (info) => {
    const { response } = await dialog.showMessageBox(win, {
      message: `Version ${info.version} is ready.`, buttons: ['Restart now', 'Later'] });
    if (response === 0) autoUpdater.quitAndInstall();
    // choosing "Later" still installs automatically the next time the app closes
  });
  autoUpdater.checkForUpdates();
  setInterval(() => autoUpdater.checkForUpdates(), 4 * 60 * 60 * 1000);
}

app.whenReady().then(() => { start(); setupUpdates(); });
app.on('window-all-closed', () => app.quit());
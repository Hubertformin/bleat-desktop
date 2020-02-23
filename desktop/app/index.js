const { app, BrowserWindow, Menu } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen } = require('./splash');

const path = require('path');

// let serve;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// placholder for indexer instance
let indexerWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = false;

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'Open Dev Tools',
        click() {
          mainWindow.openDevTools();
        },
      },
      {
       role: 'reload'
      }
    ],
  },
];

async function createWindow () {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1600,
    show: false,
    title: 'Bleat',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  if(useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
    if (serve) {
      mainWindow.loadURL(`http://localhost:4200`);
    } else {
      mainWindow.loadURL(`file://${__dirname}/www/index.html`);
    }
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);
// launch indexer on app ready
/*app.on('ready', () => {
  indexerWindow = new BrowserWindow({
    height: 600,
    width: 850,
    show: true,
    title: 'Bleat Indexer v1.0.1',
    webPreferences: {
      nodeIntegration: true,
    }
  });
  // load file
  indexerWindow.loadURL(`file://${__dirname}/indexer/index.html`);
  indexerWindow.webContents.openDevTools();
});*/

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here

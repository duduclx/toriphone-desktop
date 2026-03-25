import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "path";

const isDev = process.env.IS_DEV === "true";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("enable-usermedia-screen-capturing");
app.commandLine.appendSwitch("enable-media-stream");

// Configurer le chemin vers les fichiers publics (locales, images)
const publicPath = isDev
  ? path.join(__dirname, "../public") // En développement
  : path.join(app.getAppPath(), "public"); // En production

ipcMain.on("getAppPath", (event) => {
  event.returnValue = publicPath;
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    resizable: true,
    frame: true,
    icon: path.join(publicPath, "icons/toriappicon.png"),
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
      //webSecurity: false, // À éviter en prod, mais utile pour tester
    },
  });

  if (process.env.IS_DEV) {
    mainWindow.loadURL("http://localhost:3000"); // Charge le serveur de développement Vite
    mainWindow.webContents.openDevTools();

  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html")); // Charge le fichier HTML de production
  }
  

}

//app.whenReady().then(createWindow);
app.on("ready", () => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === "media") {
      callback(true);
    } else {
      callback(false);
    }
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

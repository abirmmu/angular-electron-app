"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var PDFWindow = require('electron-pdf-window');
var win, serve, pdfWin;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
var url = require("url");
if (serve) {
    require('electron-reload')(__dirname, {});
}
var template = [
    {
        label: 'File'
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Call Angular Method',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.send('call-angular-method');
                    }
                }
            }
        ]
    },
    {
        label: 'Reports',
        submenu: [
            {
                label: 'Accounts',
                click: function () {
                    pdfWin = new PDFWindow({
                        width: 800,
                        height: 600
                    });
                    pdfWin.loadURL('http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf');
                }
            }
        ]
    }
];
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height
    });
    // and load the index.html of the app.
    win.loadURL(url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, '/index.html'),
        slashes: true
    }));
    // Open the DevTools.
    if (serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}

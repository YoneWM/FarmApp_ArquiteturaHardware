import {app, BrowserWindow} from 'electron'
import path from 'path'

app.on('ready',()=>{
    const mainWindow = new BrowserWindow({
        width:1400,
        height:750,
        minWidth:1000,
        minHeight:600,
        autoHideMenuBar:true
    })

    mainWindow.loadFile(path.join(app.getAppPath(),"/dist-react/index.html"))
})
import Api from "./Api.js";
import {h} from "vue";
import {changeScheme} from "./Utils.js";


export default class WConsole {


    terminalSocketData;
    terminalSocketControl;
    xTerm;
    name;
    cluster;

    constructor(name, cluster) {
        this.name = name;
        this.cluster = cluster;
    }


    getWebSocket()
    {
        return this.terminalSocketData;
    }

    closeSocket(oldName)
    {
        if(this.name === oldName)
        {

            if(this.terminalSocketControl) this.terminalSocketControl.close()
            if(this.terminalSocketData) this.terminalSocketData.close()
            console.log(name + " is closed");

        }
    }

    async defineTerminal(terminal)
    {
        this.xTerm = terminal
        const webSocketsUrl = await Api.getInstance().getWebSocketsConsoleURL(this.name)
        const host = await Api.getInstance().getCluster(this.cluster)
        this.terminalSocketData = new WebSocket(changeScheme(host.metadata.url + webSocketsUrl.Data, 'wss://'));
        this.terminalSocketControl = new WebSocket(changeScheme(host.metadata.url + webSocketsUrl.Control, 'wss://'))

        this.terminalSocketData.onopen = (function (){
            console.log('connection opened');
        });

        this.terminalSocketData.onabort = (function (){
            console.log('connection aborted');
        });




        this.terminalSocketData.onerror = (function (error){
            console.log(error)
        });

        this.terminalSocketData.binaryType = "arraybuffer";
        this.terminalSocketData.onmessage = (message) => {
            terminal.write(new Uint8Array(message.data));
        };



    }

}
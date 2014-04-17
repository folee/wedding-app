XK.Connection = {
    "connectionUp": true,
    "notification": {
        "timeoutId": null,
        "msg": "The application is unable to access the Internet. This application requires an active network connection.",
        "show": true,
        "count": 0,
        "tooManyAlertBoxes": 3,
        "debug": false
    },
    "phonegapReady": false,
    "showNotification": function (toggle) {
        var self = XK.Connection;
        if (toggle === false) self.notification.show = false;
        else self.notification.show = true;
        return self.notification.show
    },
    "isConnected": function () {
        var self = XK.Connection;
        return self.connectionUp
    },
    "status": function () {
        var self = XK.Connection;
        self.detectConnection();
        if (self.phonegapReady === false) console.log("Waiting for phonegap deviceready event");
        else console.log("Phonegap is ready");
        console.log("Connection state is " + self.isConnected())
    },
    "phonegapActive": function () {
        var self = XK.Connection;
        self.phonegapReady = true;
        self.detectConnection()
    },
    "init": function () {
        var self = XK.Connection;
        document.addEventListener("deviceready", self.phonegapActive, false);
        document.addEventListener("online", self.fireConnectionUp, false);
        document.addEventListener("offline", self.fireConnectionDown, false);
        document.addEventListener("deviceconnectionup", self.setConnectionUp, false);
        document.addEventListener("deviceconnectiondown", self.setConnectionDown, false);
        document.addEventListener("pause", self.detectConnection, false);
        self.detectConnection()
    },
    "detectConnection": function () {
        var self = XK.Connection;
        if (self.phonegapReady === true) {
            var connectionState = navigator.network.connection.type;
            if (self.isValidConnectionState(connectionState)) self.fireConnectionUp();
            else self.fireConnectionDown()
        }
    },
    "isValidConnectionState": function (connectionState) {
        var s = {};
        s[Connection.NONE] = false;
        s[Connection.UNKNOWN] = false;
        s[Connection.ETHERNET] = true;
        s[Connection.WIFI] = true;
        s[Connection.CELL_2G] = true;
        s[Connection.CELL_3G] = true;
        s[Connection.CELL_4G] = true;
        return s[connectionState]
    },
    "fireConnectionUp": function () {
        var e = new CustomEvent("deviceconnectionup");
        document.dispatchEvent(e)
    },
    "fireConnectionDown": function () {
        var e = new CustomEvent("deviceconnectiondown");
        document.dispatchEvent(e)
    },
    "setConnectionUp": function () {
        var self = XK.Connection;
        self.connectionUp = true;
        if (self.notification.timeoutId) window.clearTimeout(self.notification.timeoutId);
        self.notification.timeoutId = null
    },
    "setConnectionDown": function () {
        var self = XK.Connection;
        if (self.connectionUp === true) self.notifyConnectionDown();
        self.connectionUp = false
    },
    "notifyConnectionDown": function () {
        var self = XK.Connection;
        var title = "Network Error";
        var msg = self.notification.msg;
        self.say(title, msg)
    },
    "nativeNotification": function (title, msg) {
        var self = XK.Connection;
        navigator.notification.alert(msg, self.detectConnection, title, "OK")
    },
    "defaultNotification": function (msg) {
        var self = XK.Connection;
        alert(msg);
        self.detectConnection()
    },
    "say": function (title, msg) {
        if (msg === "") return;
        var self = XK.Connection;
        if (self.notification.count > self.notification.tooManyAlertBoxes) self.showNotification(false);
        else self.notification.count++; if (self.notification.show === true) if (self.phonegapReady) self.nativeNotification(title, msg);
		else self.defaultNotification(msg)
    }
};
XK.Connection.init();
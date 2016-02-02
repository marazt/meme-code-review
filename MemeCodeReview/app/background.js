//installation stuff
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        saveMemes([
            { "name": "what the 1", "url": "http://i.imgur.com/UwBm4jm.jpg" },
            { "name": "what the 2", "url": "http://cdn.meme.am/instances/250x250/60892106.jpg" },
            { "name": "oh yeah", "url": "http://i.imgur.com/qgPHHcq.jpg" },
            { "name": "spaggetti", "url": "http://i.imgur.com/Q1h4iuQ.jpg" },
            { "name": "clean code", "url": "http://i.imgur.com/GBXDOu9.jpg" },
            { "name": "next time", "url": "http://i.imgur.com/1TDhSAn.jpg" }
        ]);
    } else if (details.reason == "update") {
        //
    }
});
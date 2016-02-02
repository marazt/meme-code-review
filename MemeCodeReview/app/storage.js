/**
 * Fucntion to load memes from chrome storage
 * @param {function} action to be execute after data is loaded
*/
var loadMemes = function (action) {
    //var items = localStorage["items"];
    //items = items ? JSON.parse(items) : [];
    chrome.storage.local.get("memeItems", function (result) {
        action(result.memeItems);
    });
}

/**
 * Function to save memes into chrome storage
 * @param {Array} items array with memes
 */
var saveMemes = function (items) {
    chrome.storage.local.set({ "memeItems": items });
}

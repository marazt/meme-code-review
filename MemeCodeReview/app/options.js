var memeDiv = null;
var items = null;
var countOfItems = 0;

/**
 * Init function
 */
const init = function () {
    window.memDiv = $("#memes");
    loadMemes((memes) => {
        items = memes;
        $.each(items, function (index, item) {
            addItem(index, item.name, item.url);
            ++countOfItems;
        });
        bindListeners();
    });

}

/**
 * Function to add new empty item
 */
const addNew = function () {
    addItem(countOfItems, "", "");
}

/**
 * Function to remove item
 * @param {event} e  
 */
const removeItem = function (e) {
    $(`#${e.target.id}`).parent().remove();
    --countOfItems;
}

/**
 * Function to create item record
 * @param {string} id  of the item
 * @param {string} name name of the item
 * @param {string} url of the item
 */
const addItem = function (id, name, url) {
    const key = $("<input/>", { "value": name });
    const val = $("<input/>", { "value": url, "class": "url" });
    const img = $("<img/>", { "src": url, "alt": url, "class": "sample" });
    const btn = $("<button/>", { "id": "remove-" + id, "text": "X" });
    btn.on("click", removeItem);
    const line = $("<div/>", { "class": "item" });
    line.append(key, val, img, btn);
    memDiv.append(line);
    ++countOfItems;
}

/**
 * Function to save items
 */
const save = function () {
    items = [];
    $(".item").each(function (index, item) {
        const children = item.children;
        items.push({ name: children[0].value, url: children[1].value });
    });

    saveMemes(items);
}

/**
 * Function to bind listeners on all needed elements
 */
const bindListeners = function () {
    $("#add-item").on("click", addNew);
    $("#save").on("click", save);

    for (var i = 0; i < items.length; ++i) {
        $(`#remove-${i}`).on("click", removeItem);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    init();
});

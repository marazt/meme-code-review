/**
 * Function to load memes
 * @param {string} selector of the parent element
 */
const loadPopularMemes = function (parent) {
    const getUrl = "https://api.imgflip.com/get_memes";
    const postUrl = "https://api.imgflip.com/caption_image";

    var selectedMeme = null;

    $.getJSON(getUrl, function (response) {

        if (!response.success) {
            alert("Could not load memes.");
            return;
        }

        const modal = $("<div/>", {
            "id": "memeList",
            "style": "position: absolute; top:10px; left:0; right:0; width: 60%; z-index: 100; padding:3px; margin: 10px auto; border: 1px solid #ccc; background: #f5f5f5; border-radius: 2px;",
        });

        const content = $("<div/>");
        modal.append(content);

        const topLabel = $("<label/>", { "text": "Top text: " });
        const topText = $("<input/>", { "style": "width: 100px;" });
        const topDiv = $("<div/>", { "style": "margin: 5px 0 10px 10px;" });
        topDiv.append(topLabel, topText);

        const bottomLabel = $("<label/>", { "text": "Bottom text: " });
        const bottomText = $("<input/>", { "style": "width: 100px;" });
        const bottomDiv = $("<div/>", { "style": "margin: 5px 0 10px 10px;" });
        bottomDiv.append(bottomLabel, bottomText);

        const buttonCreate = $("<button/>", { "text": "Create meme" });
        buttonCreate.on("click", (e) => {
            if (!selectedMeme) {
                alert("You have to select some meme.");
                return;
            }

            $.ajax({
                url: postUrl,
                method: "POST",
                data: JSON.stringify({
                    "template_id": selectedMeme[0].alt,
                    "username": "memecodereview",
                    "password": "TopSecret15",
                    "text0": topText.val(),
                    "text1": bottomText.val()
                }),
                contentType: "application/json",
                dataType: "json"
            })
            .done(function (result) {
                if (result.success) {
                    loadMemes((memes) => {
                        memes.push({ name: topText.val() + " " + bottomText.val(), url: result.data.url });
                        alert("The new meme was created and saved");
                    });
                }
                else {
                    alert("An error while creating a new meme: " + result.error_message);
                }

            })
            .fail(function (result) {
                alert("An error while creating a new meme");
            });
        });

        const buttonClose = $("<button/>", { "text": "Close" });
        buttonClose.on("click", () => {
            modal.remove();
        });

        const buttonDiv = $("<div/>", { "style": "margin: 5px 0 10px 10px;" });
        buttonDiv.append(buttonCreate, buttonClose);
            

        content.append(topDiv, bottomDiv, buttonDiv);


        for (var i = 0; i < Math.min(response.data.memes.length, 50) ; ++i) {
            var meme = response.data.memes[i];

            var memeImg = $("<img/>", {
                "src": meme.url,
                "alt": meme.id,
                "style": "width:64px; height:64px; padding:3px; margin: 0 0 10px 10px; border: 1px solid #ccc; background: #f5f5f5; border-radius: 2px; cursor: pointer;"
            });

            memeImg.on("click", (e) => {
                var self = $(e.target);
                if (selectedMeme) {
                    selectedMeme.css("background", "#F5F5F5");
                }
                self.css("background", "#205081");
                selectedMeme = self;
            });

            var cover = $("<div/>", {
                "style": "float: left;"
            });

            cover.append(memeImg);
            content.append(cover);
        }

        $(parent).append(modal);

    });
}
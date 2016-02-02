var memeImageUrl = chrome.extension.getURL("img/logo.png");
var input = null;

/**
 * Function to inject data into bitbucket page
 */
var inject = function () {
    const bindItem = $(".timeline-comment");
    if (!bindItem) {
        return;
    }

    const btn = $("<img/>", {
        "style": "width:32px; height:32px; padding:3px; margin: 0 0 10px 10px; border: 1px solid #ccc; background: #f5f5f5; border-radius: 2px; cursor: pointer;",
        "src": memeImageUrl,
        "alt": "meme"
    });

    const panel = $("<div/>", { "style": "display: none; border:1px solid lightgrey; min-width:200px; border-radius: 3px;  margin-top: -55px;  margin-left: 55px; position: absolute; background: white;" });

    loadMemes((memes) => {
        $.each(bindItem, function (i, itm) {
            var b = btn.clone(true);
            var p = panel.clone(true);
            b.on("click", function () {
                if (p.is(":hidden")) {
                    $.each(memes, function (j, meme) {
                        const memeImg = $("<img/>", {
                            "style": "width:48px; height:48px; border: 1px solid lightgrey; margin: 3px; cursor: pointer;",
                            "src": meme.url,
                            "alt": meme.name
                        });
                        memeImg.on("click", (e) => {
                            const ids = ["#new_comment_field", "#new_commit_comment_field"];
                            for (var k = 0; k < ids.length; ++k) {
                                input = b.parent().parent().find(ids[k]);
                                if (input.length !== 0) {
                                    input.val(input.val() + " ![image](" + e.target.src + ")");
                                    break;
                                }
                            }
                        });
                        p.append(memeImg);
                    });
                } else {
                    p.empty();
                }
                p.toggle();
            });
            $(itm).append(b, p);
        });
    });
}

inject();
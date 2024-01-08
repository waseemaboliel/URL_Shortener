var GETdata;
var POSTdata;
const SERVER_URL = 'https://url-shortener-beta-woad.vercel.app';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function fixURL(s) {
    var prefix = 'http://';
    var prefixS = 'https://'
    var pattern = /\/\/www./g;
    if (s.substr(0, prefix.length) !== prefix && s.substr(0, prefixS.length) !== prefixS) {
        s = prefix + s;
    }
    if (!s.match(pattern)) {
        s = s.replace(/\/\//g, "//www.");
    }
    return s;

}

jQuery(".generate").on("click", function () {
    jQuery(".valid").hide()
    var URL = jQuery("[name='Long_URL']").val();
    if (URL) {
        if (validURL(URL)) {
            URL = fixURL(URL);
            POSTdata = { "longUrl": URL }
            sendData();
        } else {
            jQuery(".valid").show();
            jQuery("#copyText").val("")
        }

    }
    return false;// to prevent refresh when click on the button inside a form
});

jQuery(".copy").on("click", function () {
    var $temp = jQuery("<input>");
    jQuery("body").append($temp);
    $temp.val(jQuery("#copyText").val()).select();
    document.execCommand("copy");
    $temp.remove();
    return false;// to prevent refresh when click on the button inside a form
});





async function sendData() {
    await fetch(`${SERVER_URL}/api/url/shorten`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(POSTdata)
    }).then((resp) => resp.json())
        .then(function (response) {
            GETdata = SERVER_URL + "/" + response.code;
            return response;
        });

    if (GETdata) {
        jQuery("[name='Short_URL']").val(GETdata)
    }
}

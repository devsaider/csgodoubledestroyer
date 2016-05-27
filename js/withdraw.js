// chrome.storage.sync.set({'value': theValue}, function() {
//   // Notify that we saved.
//   message('Settings saved');
// });
// withdraw
var botsData = [];

function loadDetails() {
    var timeout = 0;
    for (var botID in botIDs) {
        var bot64id = botIDs[botID];
        $.ajax({
        url: 'https://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/',
        strSteamId: bot64id,
        data: {
            SteamID: bot64id,
            key: apiKey
        },
        success: function(data) {
            // $("div .slot").find("[data-id='" + current + "']");
            console.log("Got steam api list ");
            //console.log(data);

            data.result.items.forEach(function(item) {
                var item_div = $(".slot[data-id=" + item.id + "]");

                if (item_div && item.attributes) {
                    var floatValue;
                    var dopplerPhase;

                    // i actually stole this from SIH. sorry..
                    var dPstr = '';

                    for (var j = 0; j < item.attributes.length; j++) {
                        if (item.attributes[j].defindex == 8) {
                            floatValue = item.attributes[j].float_value;
                        }
                        if (item.attributes[j].defindex == 6) {
                            dopplerPhase = item.attributes[j].float_value;
                        }
                    }

                    var priceholder = item_div.find(".price");

                    if (floatValue !== undefined && priceholder) {
                        //console.log("Item :" + item_div.find(".name").text() + ". Phase: " + dopplerPhase);
                        dPstr = dopplerPhaseName[dopplerPhase] || '';
                        if (dPstr !== '') dPstr = '<br>' + dPstr;
                        priceholder.html("<small>" + priceholder.text() + "<br>" + floatValue.toFixed(4) + dPstr + "</small>");
                    }
                }
            });

        },
        error: function() {
            console.warn("error loading bot #" + botID + " inventory");
        }
    });
    }
}

function checkForNewItems() {
    var leftReal = $("#left > span.reals").children();
    if (leftReal.length !== 0) {
        console.info("Successfully fetched %d items!", leftReal.length);

        loadDetails();
    } else {
        setTimeout(checkForNewItems, 300);
    }
}

checkForNewItems();
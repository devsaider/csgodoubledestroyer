// script itself
console.log("It works! " + steam64ID);

$.ajax({
    url: 'https://api.steampowered.com/IEconItems_730/GetPlayerItems/v0001/',
    strSteamId: steam64ID,
    data: {
        SteamID: steam64ID,
        key: apiKey
    },
    success: function(data) {
        // $("div .slot").find("[data-id='" + current + "']");
        console.log("Got steam api list");

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
                    console.log("Item :" + item_div.find(".name").text() + ". Phase: " + dopplerPhase);
                    dPstr = dopplerPhaseName[dopplerPhase] || '';
                    if (dPstr !== '') dPstr = '<br>' + dPstr;
                    priceholder.html("<small>" + priceholder.text() + "<br>" + floatValue.toFixed(4) + dPstr + "</small>");
                }
            }
        });

    },
    error: function() {
        console.warn("error loading user's inventory");
    }
});
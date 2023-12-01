var fs = require("fs")
var base_file = __dirname + "/../base.json"

module.exports = function(ctx) {
    var base = JSON.parse(fs.readFileSync(base_file, "utf-8"))
    if(base.includes(ctx.from.id)) return ctx.reply("Hello, I'm your A2-B1 lvl Cambridge assistant\nNow choose your lvl!", {reply_markup: {one_time_keyboard: true, remove_keyboard: true, inline_keyboard: [[{text: "A2", callback_data: "A2"}, {text: "B1", callback_data: "B1"}]]}})
    ctx.scene.enter("RegScene")
}

// module.exports = start
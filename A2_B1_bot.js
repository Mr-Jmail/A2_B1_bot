const { Telegraf, session, Markup, Scenes} = require('telegraf')
// const bot = new Telegraf("5707084519:AAEbFQjWYHxUDToP7oAGWEbwTD9c-ad3Y6Y") //test
const bot = new Telegraf("5937922140:AAF2G9aYZxCkDTw2HFxD7psCBB-8AhnNjzE") //основа
var base_file = __dirname + "/base.json"
var defenitions_file = __dirname + "/PP_defenitions.json"
var start = require("./scenes/start.js")
var fs = require("fs")

var RegGenerator = require("./scenes/reg.js")
var RegScene = new RegGenerator()
var PasswordScene = RegScene.GenPasswordScene()

const stage = new Scenes.Stage([PasswordScene])
bot.use(session())
bot.use(stage.on()) 

var phrasalVerbs = require("./keyboards/phrasal_verbs_keyboard.js")
var prepositionalPhrasesKeyboard = require("./keyboards/prepositional_phrases_keyboard.js")
var phrasalVerbsPartsKeyboard = require("./keyboards/PV_parts_keyboard.js")
var prepositionalPhrasesPartsKeyboard = require("./keyboards/PP_parts_keyboard.js")


bot.start(async ctx => {
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await start(ctx)
})

bot.action("to start", async ctx => {
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await start(ctx)
})

bot.action("A2", async ctx => {
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply("Ok, now choose what you want to lern", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: [[{text: "Phrasal Verbs", callback_data: "Phrasal Verbs A2"}, {text: "Prepositional Phrases", callback_data: "Prepositional Phrases A2"}], [{text: "Back", callback_data: "to start"}]]}})
})

bot.action("B1", async ctx => {
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply("Ok, now choose what you want to lern", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: [[{text: "Phrasal Verbs", callback_data: "Phrasal Verbs B1"}, {text: "Prepositional Phrases", callback_data: "Prepositional Phrases B1"}], [{text: "Back", callback_data: "to start"}]]}})
})

bot.action(/^Phrasal Verbs/ig, async ctx => {
    var lvl = ctx.match.input.split("Phrasal Verbs ")[1]
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply("What part would you like to start with?", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: phrasalVerbsPartsKeyboard[lvl]}})
})

bot.action(/^PV Part/ig, async ctx => {
    var [part, lvl] = ctx.match.input.split("PV Part ")[1].split(" ")
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    ctx.reply("Now you can click on any word and see it in the dictionary", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: phrasalVerbs[lvl]["Part " + part]}})
})

bot.action(/^Prepositional Phrases/ig, async ctx => {
    var lvl = ctx.match.input.split("Prepositional Phrases ")[1]
    // console.log(prepositionalPhrasesPartsKeyboard);
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply("What part would you like to start with?", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: prepositionalPhrasesPartsKeyboard[lvl]}})

})

bot.action(/^PP Part/ig, async ctx => {
    var [part, lvl] = ctx.match.input.split("PP Part ")[1].split(" ")
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply("Now you can click on any word and see it in the dictionary", {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: prepositionalPhrasesKeyboard[lvl]["Part " + part]}})
    console.log(part);
})

bot.action(/PP def/, async ctx => {
    var [word_to_define, lvlPart] = ctx.match.input.split("PP def ")[1].split(" - ")
    console.log(word_to_define);
    var [lvl, part] = lvlPart.split(" ")
    var base = JSON.parse(fs.readFileSync(defenitions_file, "utf-8"))
    try {await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id).catch(err => {})} catch (error) {}
    await ctx.reply(base[lvl][word_to_define], {reply_markup: {remove_keyboard: true, one_time_keyboard: true, inline_keyboard: [[{text: "Back", callback_data: `PP Part ${part} ${lvl}`}]]}, parse_mode: "HTML"})
})

bot.launch()
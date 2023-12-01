const {Markup, Scenes} = require('telegraf')
const start = require('./start')
var base_file = __dirname + "/../base.json"
var password_base_file = __dirname + "/../password_base.json"
var fs = require("fs")


class RegGenerator {
    GenPasswordScene(){
        const reg = new Scenes.BaseScene('RegScene')
        var message
        reg.enter(async ctx => {
            message = await ctx.reply("Добрый день, вы еще не зарегистрированы в нашем боте, для регистрации введите пароль", {reply_markup: {one_time_keyboard: true, remove_keyboard: true, inline_keyboard: [[{text: "Получить доступ", url: "t.me/fcvf_jmail"}]]}})
        })
        reg.on("message", async ctx => {
            try {await ctx.telegram.deleteMessage(ctx.chat.id, message.message_id).catch(err => {})} catch (error) {}
            var passwords = JSON.parse(fs.readFileSync(password_base_file, "utf-8"))
            if(!passwords.includes(ctx.message.text)) return message = await ctx.reply("Пароль неверный, попробуйте еще раз или свяжитесь с поддержкой", {reply_markup: {one_time_keyboard: true, remove_keyboard: true, inline_keyboard: [[{text: "Тех поддержка", url: "t.me/fcvf_jmail"}]]}})
            if(ctx.message.text != "cevl") {
                passwords.splice(passwords.indexOf(ctx.message.text), 1) 
                fs.writeFileSync(password_base_file, JSON.stringify(passwords, null, 4))
            }
            var base = JSON.parse(fs.readFileSync(base_file, "utf-8"))
            base.push(ctx.from.id)
            fs.writeFileSync(base_file, JSON.stringify(base, null, 4))
            await ctx.scene.leave()
            await start(ctx)
        })
        return reg
    }
}

module.exports = RegGenerator
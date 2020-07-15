'use strict'

const Telegraf = require('telegraf')
// const storage = require('./storage')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('photo', async ctx => {
  try {
    // const fileId = ctx.update.message.photo[1].file_id
    // const url = await ctx.telegram.getFileLink(fileId)
    // await storage.uploadPhoto(url, `${ctx.update.message.date}.jpg`)
    ctx.reply('Saved!')
  } catch (err) {
    console.log(err)
    ctx.reply('Oops, something went wrong :(')
  }
})

bot.launch()

bot.telegram.setWebhook(`${process.env.WEBHOOK_HOST}:${process.env.PORT}/upload`)
bot.startWebhook('/upload', null, process.env.PORT)

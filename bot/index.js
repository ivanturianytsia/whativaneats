'use strict'

const Telegraf = require('telegraf')
const storage = require('./storage')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('photo', async ctx => {
  try {
    await storage.uploadPhoto(ctx)
    ctx.reply('Saved!')
  } catch (err) {
    console.log(err)
    ctx.reply('Oops, something went wrong :(')
  }
})

bot.launch()

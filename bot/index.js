'use strict'

const Telegraf = require('telegraf')
const fs = require('fs')
const axios = require('axios')
const firebaseAdmin = require('firebase-admin')
const firebaseServiceKey = require(process.env.FIREBASE_SERVICE_KEY_PATH)

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceKey),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

const bucket = firebaseAdmin.storage().bucket()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('photo', async (ctx) => {
  const files = ctx.update.message.photo
  const fileId = files[1].file_id

  const url = await ctx.telegram.getFileLink(fileId)
  const response = await axios({url, responseType: 'stream'})

  const blob = bucket.file(`${ctx.update.message.date}.jpg`)
  const blobStream = blob.createWriteStream()

  response.data.pipe(blobStream)
    .on('finish', () => ctx.reply('works!'))
    .on('error', err => {
      console.log(err)
      ctx.reply('oops an error occured')
    })
})

bot.launch()

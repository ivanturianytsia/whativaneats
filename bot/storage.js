'use strict'

const axios = require('axios')
const firebaseAdmin = require('firebase-admin')
const firebaseServiceKey = require(process.env.FIREBASE_SERVICE_KEY_PATH)

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceKey),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

const bucket = firebaseAdmin.storage().bucket()

module.exports = {
  async uploadPhoto (ctx) {
    const fileId = ctx.update.message.photo[1].file_id

    const url = await ctx.telegram.getFileLink(fileId)
    const response = await axios({url, responseType: 'stream'})

    const blob = bucket.file(`${ctx.update.message.date}.jpg`)
    const blobStream = blob.createWriteStream()

    return new Promise((resolve, reject) => {
      response.data.pipe(blobStream)
        .on('finish', resolve)
        .on('error', reject)
    })
  }
}
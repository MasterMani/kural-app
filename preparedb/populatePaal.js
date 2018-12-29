const models = require('../lib/server/models').default
const fs = require('fs')
const Paal = models.Paal
const mongoose = require('mongoose')

Paal.collection.drop()

const addPaal = (paalContents) => {
  let paals = preparePaals(paalContents)
  Paal.insertMany(paals)
    .then(() => {
      console.log("inserted paals");
      // mongoose.connection.close()
    })
    .catch(err => { console.log(err) })
}

const preparePaals = (paalContents) => {
  return paalContents.map(cnt => {
    const kural = JSON.parse(cnt)
    const paalData = {
      paalIdx: kural.paalId,
      paal: kural.paal,
      paalTranslation: "",
      paalTransliteration: "",
      paalDefinition: "",
      paalStart: kural.paalStartNo,
      paalEnd: kural.paalEndNo
    }
    return paalData
  })
}

module.exports = createPaal = (paals) => addPaal(paals)
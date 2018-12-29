const models = require('../lib/server/models').default
const fs = require('fs')
const mongoose = require('mongoose')
const Athigaram = models.Athigaram
const Kural = models.Kural

Kural.collection.drop()

const addKural = (kural) => {
  Kural.create(kural)
    .then(() => {
      console.log("inserted kural");
    })
    .catch(err => { console.log(err) })
}

const createKurals = (kuralContents) => {
  kuralContents.forEach(cnt => {
    const kural = JSON.parse(cnt)
    const kuralData = {
      kuralIdx: kural.kuralId,
      kural: kural.kural,
      kuralTranslation: kural.kuralEngish,
      kuralTransliteration: kural.kuralTransliteration,
      kuralDefinition: kural.kuralEnglishMeaning,
      paalId: "",
      iyyalId: "",
      athigaramId: "",
      // uraiId : new mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    }

    Athigaram.findOne({ athigaramIdx: kural.athigaramId })
      .then(data => {
        kuralData.athigaramId = data._id
        kuralData.iyyalId = data.iyyalId
        kuralData.paalId = data.paalId
        addKural(kuralData)
      })
  })
}

module.exports = createKurals
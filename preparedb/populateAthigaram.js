const models = require('../lib/server/models').default
const fs = require('fs')
const Athigaram = models.Athigaram
const Iyyal = models.Iyyal
const mongoose = require('mongoose')

Athigaram.collection.drop()

const addAthigaram = (athigaram) => {
  Athigaram.create(athigaram)
    .then(() => {
      console.log("inserted athigaram");
    })
    .catch(err => { console.log(err) })
}

const createAthigaram = (athigaramContents) => {
  athigaramContents.forEach(cnt => {
    const kural = JSON.parse(cnt)
    const athigaramData = {
      athigaramIdx: kural.athigaramId,
      athigaram: kural.athigaram,
      athigaramTranslation: kural.athigaramEnglish,
      athigaramTransliteration: kural.athigaramTransliteration,
      athigaramDefinition: "",
      athigaramStart: kural.athigaramStartNo,
      athigaramEnd: kural.athigaramEndNo,
      paalId: "",
      iyyalId: "",
    }

    Iyyal.findOne({ iyyalIdx: kural.iyyalId })
      .then(data => {
        athigaramData.iyyalId = data._id
        athigaramData.paalId = data.paalId
        addAthigaram(athigaramData)
      })

  })
}

module.exports = createAthigaram
// Athigaram.findOne({iyyalId : "5c26e8ca695633085b806f4c"})
  // .populate('paalId', "paal paalIdx")
  // .populate('iyyalId', "iyyal iyyalIdx")
  // .exec((err, res) => {
//     console.log(err)
//     console.log(res)
//   })
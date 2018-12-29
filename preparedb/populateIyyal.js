const models = require('../lib/server/models').default
const fs = require('fs')
const Paal = models.Paal
const Iyyal = models.Iyyal
const mongoose = require('mongoose')

Iyyal.collection.drop()

const addIyyal = (iyyal) => {
  Iyyal.create(iyyal)
    .then(() => {
      console.log("inserted iyyals");
    })
    .catch(err => { console.log(err) })
}

const createIyyals = (iyyalContents) => {
  iyyalContents.forEach(cnt => {
    const kural = JSON.parse(cnt)
    const iyyalData = {
      iyyalIdx: kural.iyyalId,
      iyyal: kural.iyyal,
      iyyalTranslation: "",
      iyyalTransliteration: "",
      iyyalDefinition: "",
      iyyalStart: kural.iyyalStartNo,
      iyyalEnd: kural.iyyalEndNo,
      paalId: ""
    }
    Paal.findOne({ paalIdx: kural.paalId })
      .then(data => {
        iyyalData.paalId = data._id
        addIyyal(iyyalData)
      })

  })
}



module.exports = createIyyals
// Iyyal.findOne({iyyalIdx : 1})
//   .populate('paalId', "paal paalIdx")
//   .exec((err, res) => {
//     console.log(err)
//     console.log(res)
//   })
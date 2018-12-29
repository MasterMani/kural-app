const models = require('../lib/server/models').default
const fs = require('fs')
const Urai = models.Urai
const Kural = models.Kural

Urai.collection.drop()

const addKural = (kural) => {
  Urai.create(kural)
    .then((data) => {
      Kural.findOneAndUpdate({ kuralIdx: data.uraiIdx }, { uraigalId: data._id }).then(() => { console.log("updatd kural") }).catch(err => { console.log(err) })
      console.log("inserted urai");
    })
    .catch(err => { console.log(err) })
}

const createUrai = (kuralContents) => {
  kuralContents.forEach(cnt => {
    const kural = JSON.parse(cnt)
    const uraiData = {
      kuralId: "",
      uraiIdx: kural.kuralId,
      muVaUrai: kural.muVaUrai,
      kalaignarUrai: kural.kalaignarUrai,
    }

    Kural.findOne({ kuralIdx: kural.kuralId })
      .then(data => {
        uraiData.kuralId = data._id
        addKural(uraiData)
      })
  })
}

module.exports = createUrai
import * as Models from '../models'
const { 
  Athigaram,
  Kural } = Models.default

export const getKuralByIdx = (id) => {
  return new Promise((res, rej) => {
    Kural.findOne({ kuralIdx: id }, { _id: 0, __v: 0 })
      .populate('paalId', 'paal -_id')
      .populate('iyyalId', 'iyyal -_id')
      .populate('athigaramId', '-_id -__v -athigaramStart -athigaramEnd')
      .populate('uraigalId', 'muVaUrai kalaignarUrai -_id')
      .exec((err, data) => {
        if (err) rej(err)
        res(cleanKural(data))
      })
  })
}

export const getKuralByAthigaramIdx = (id) => {
  return new Promise((res, rej) => {
    Athigaram.findOne({ athigaramIdx: id }).then(data => {
      Kural.find({ athigaramId: data._id }, { _id: 0, __v: 0 })
        .populate('paalId', 'paal -_id')
        .populate('iyyalId', 'iyyal -_id')
        .populate('athigaramId', '-_id -__v -athigaramStart -athigaramEnd')
        .populate('uraigalId', 'muVaUrai kalaignarUrai -_id')
        .sort('kuralIdx')
        .exec((err, data) => {
          if (err) rej(err)
          const results = data.map(data => cleanKural(data))
          res(results)
        })
    })
  })
}

export const getAllAthigarams = () => {
  return new Promise((res, rej) => {
    Athigaram.find({}, {
      _id:0, 
      athigaram:1, 
      athigaramTranslation: 1,
      athigaramTransliteration: 1,
      athigaramIdx:1
    })
    .populate('paalId')
    .populate('iyyalId')
    .sort('athigaramIdx')
    .exec((err, data) => {
      if(err) rej(err)
      const results = data.map(obj=>cleanAthigaram(obj))
      res(results)
    })
  })
}

export const getAthigaramByAny = (idx, filterIdx) => {
  return new Promise((res, rej) => {
    getAllAthigarams()
      .then(data => {
        res(data.filter(obj => {return obj[filterIdx] === idx}))
      })
      .catch(err => {rej(err)})
  })
}

export const getAllIyyals = () => {
  return new Promise((res, rej) => {
    getAllAthigarams()
      .then(data => {res(filterObj(data, 'iyyal'))})
      .catch(err => rej(err))
  })
}

export const getAllPaals = () => {
  return new Promise((res, rej) => {
    getAllAthigarams()
      .then(data => {res(filterObj(data, 'paal'))})
      .catch(err => rej(err))
  })
}

const cleanKural = (data) => {
  data = data["_doc"]

  const result = Object.assign({},
    data, data.paalId._doc,
    data.iyyalId._doc,
    data.athigaramId._doc,
    data.uraigalId._doc)

  delete result.paalId
  delete result.iyyalId
  delete result.athigaramId
  delete result.uraigalId
  return result
}

const cleanAthigaram = (data) => {
  data = data._doc
  const result = {
    athigaramIdx : data.athigaramIdx,
    athigaram : data.athigaram,
    athigaramTranslation : data.athigaramTranslation,
    athigaramTransliteration: data.athigaramTransliteration,
    athigaramDefinition : data.athigaramDefinition,
    paalIdx : data.paalId._doc.paalIdx,
    paal : data.paalId._doc.paal,
    iyyalIdx : data.iyyalId._doc.iyyalIdx,
    iyyal : data.iyyalId._doc.iyyal
  }
  return result
}

const filterObj = (arrOfObj, key) => {
  let results = [],
    values = [];
  arrOfObj.forEach(obj => {
    let val = obj[key]
    if(!values.includes(val)) {
      values.push(val)
      results.push(obj)
    }
  })  
  return results
}

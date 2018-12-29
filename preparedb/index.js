const async = require('async')
const fs = require('fs')
const createPaal = require('./populatePaal')
const createIyyals = require('./populateIyyal')
const createAthigarams = require('./populateAthigaram')
const createKurals = require('./populateKural')
const createUrai = require('./populateUrai')

const paalInput = '../data/paal.json'
const paalContents = fs.readFileSync(paalInput, 'utf-8').split('\n').filter(e => e)

const iyyalInput = '../data/iyyal.json'
const iyyalContents = fs.readFileSync(iyyalInput, 'utf-8').split('\n').filter(e => e)

const athigaramInput = '../data/athigaram.json'
const athigaramContents = fs.readFileSync(athigaramInput, 'utf-8').split('\n').filter(e => e)

const kuralInput = '../data/kuralData.json'
const kuralContents = fs.readFileSync(kuralInput, 'utf-8').split('\n').filter(e => e)

async.series([
  function (cb) {
    createPaal(paalContents)
    cb(null, "done 1")
  },
  function (cb) {
    setTimeout(function () {
      createIyyals(iyyalContents)
      cb(null, "done 2")
    }, 6000);
  },function(cb){
    setTimeout(function(){
      createAthigarams(athigaramContents)
      cb(null, "done 3")
    }, 14000)
  },function(cb){
    setTimeout(function(){
      createKurals(kuralContents)
      cb(null, "done 4")
    }, 20000)
  },function(cb){
    setTimeout(function(){
      createUrai(kuralContents)
      cb(null, "done 5")
    }, 30000)
  }
], function (err, results) {
  console.log(results)
})
import {Router} from 'express';
import {Kural, Athigaram, Iyyal, Urai, Paal} from '../models'
import { 
  getKuralByIdx, 
  getKuralByAthigaramIdx, 
  getAllAthigarams,
  getAthigaramByAny,
  getAllPaals,
  getAllIyyals
} from '../controllers'

const router = new Router();

router.get('/athigaram/all', (req, res) => {
  getAllAthigarams()
    .then(data => {res.status(200).send(data)})
    .catch(err => res.status(400).send(err))
})

router.get('/kural/:kuralIdx', (req, res) => {
  const idx = parseInt(req.params.kuralIdx)
  if(idx && idx > 0 && idx < 1331){
    getKuralByIdx(idx)
      .then(data => {res.status(200).send(data)})
      .catch(err => res.status(400).send(err))
  }else res.status(400).send({err: "Enter a valid interger between 1 to 1330"})  
})


router.get('/athigaram/:athigaramIdx', (req, res) => {
  const idx = parseInt(req.params.athigaramIdx)
  if(idx && idx > 0 && idx < 134){
    getKuralByAthigaramIdx(idx)
      .then(data => {res.status(200).send(data)})
      .catch(err => res.status(400).send(err))
  }else res.status(400).send({err: "Enter a valid interger between 1 to 133"})  
})

router.get('/iyyal/:iyyalIdx/athigarangal', (req, res) => {
  const idx = parseInt(req.params.iyyalIdx)
  if(idx && idx > 0 && idx < 10){
    getAthigaramByAny(idx, 'iyyalIdx')
      .then(data => {res.status(200).send(data)})
      .catch(err => res.status(400).send(err))
  }else res.status(400).send({err: "Enter a valid interger between 1 to 9"})  
})

router.get('/paal/:paalIdx/athigarangal', (req, res) => {
  const idx = parseInt(req.params.paalIdx)
  if(idx && idx > 0 && idx < 4){
    getAthigaramByAny(idx, 'paalIdx')
      .then(data => {res.status(200).send(data)})
      .catch(err => res.status(400).send(err))
  }else res.status(400).send({err: "Enter a valid interger between 1 to 3"})  
})


router.get('/iyyal/all', (req, res) => {
  getAllIyyals()
      .then(data => {res.status(200).send(data)})
      .catch(err => res.status(400).send(err))
})

router.get('/paal/all', (req, res) => {
  getAllPaals()
    .then(data => {res.status(200).send(data)})
    .catch(err => res.status(400).send(err))
})

export default router
import { Schema, model } from 'mongoose'

const paalSchema = new Schema({
  paalIdx : {type : Number, required : true},
  paal : {type : String, required : true, trim: true, unique: true},
  paalTranslation : {type : String, trim: true},
  paalTransliteration : {type : String, trim: true},
  paalDefinition : {type : String, trim: true},
  paalStart : Number,
  paalEnd : Number
})

export default model('Paal', paalSchema)
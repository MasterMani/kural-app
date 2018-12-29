import { Schema, model } from 'mongoose'

const iyyalSchema = new Schema({
  iyyalIdx : {type : Number, required : true},
  iyyal : {type : String, required : true, trim: true, unique: true},
  iyyalTranslation : {type : String, trim: true},
  iyyalTransliteration : {type : String, trim: true},
  iyyalDefinition : {type : String, trim: true},
  iyyalStart : Number,
  iyyalEnd : Number,
  paalId : {type: Schema.Types.ObjectId, ref : "Paal"}
})

export default model('Iyyal', iyyalSchema)
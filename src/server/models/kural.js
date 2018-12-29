import { Schema, model } from 'mongoose'

const kuralSchema = new Schema({
  kuralIdx : {type : Number, required: true},
  kural : {type : String, required: true, trim: true},
  kuralTranslation : {type : String, required: true, trim: true},
  kuralTransliteration : {type : String, required: true, trim: true},
  kuralDefinition : {type : String, required: true, trim: true},
  paalId : {type : Schema.Types.ObjectId, ref: "Paal"},
  iyyalId : {type : Schema.Types.ObjectId, ref: "Iyyal"},
  athigaramId: {type : Schema.Types.ObjectId, ref: "Athigaram"},
  uraigalId : {type : Schema.Types.ObjectId, ref: "Urai"}
})

// kuralSchema.set('toObject', {virtuals : true})
// kuralSchema.set('toJSON', {virtuals : true})
// kuralSchema
//   .virtual('breadCrumbs')
//   .get(function(){
//     return `${this.paalId} > ${this.iyyalId} > ${this.athigaramId} > ${this._id}`
//   })

export default model('Kural', kuralSchema)

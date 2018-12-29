import { Schema, model } from 'mongoose'

const athigaramSchema = new Schema({
  athigaramIdx : {type : Number, required : true, unique: true},
  athigaram : {type : String, required : true, trim: true},
  athigaramTranslation : {type : String, required: true, trim: true},
  athigaramTransliteration : {type : String, required: true, trim: true},
  athigaramDefinition : {type : String, trim: true},
  athigaramStart : Number,
  athigaramEnd : Number,
  paalId : {type: Schema.Types.ObjectId, ref: "Paal"},
  iyyalId : {type: Schema.Types.ObjectId, ref: "Iyyal"},
})

athigaramSchema.set('toJSON', { virtuals: true })
athigaramSchema.set('toObject', { virtuals: true })

// athigaramSchema
//   .virtual('breadCrumbs')
//   .get(function(){
//     return `${this.paalId} > ${this.iyyalId} > ${this._id}`
//   })

export default model('Athigaram', athigaramSchema)
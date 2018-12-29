import {Schema, model} from 'mongoose'

const uraiSchema = new Schema({
  kuralId: {type : Schema.Types.ObjectId, required : true, ref: 'Kural'},
  uraiIdx : {type : Number, required: true},
  muVaUrai : {type : String, required : true},
  kalaignarUrai : {type : String, required : true}
})

export default model('Urai', uraiSchema)
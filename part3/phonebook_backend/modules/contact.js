const mongoose = require('mongoose')
//require('dotenv').config()

mongoose.set('strictQuery', false)


const url = process.env.MONGO_DB_URI

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const contactSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required: true
    },
    number: {
        type:String,
        validate: {
            validator: function (num){
                return /^\d{2,3}-\d{6,}$/.test(num)
            },
            message: props => `${props.value} is not valid phonenumber`
        },
        minLength:8,
        required:true
    }
})



contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)
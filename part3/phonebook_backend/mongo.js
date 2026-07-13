const mongoose = require('mongoose')


if (process.argv.length < 3){
    console.log("give password as argument")
    process.exit(1)
}
   

const password = process.argv[2]
const url = `mongodb+srv://fullstack_db_user:${password}@fullstackdb.fcfd0ht.mongodb.net/phonebookApp`

mongoose.set('strictQuery', false)

mongoose.connect(url,{family:4})

const constactSchema = new mongoose.Schema({
    name:String,
    number:String
})

const Contact = mongoose.model('Contact', constactSchema)

if (process.argv.length === 3)
{   
    console.log("Phonebook:")
    Contact.find({}).then(
        result => {
            result.forEach(contact => {console.log(contact.name, contact.number)
            mongoose.connection.close()
        })
})
}

if (process.argv.length === 5){
    const contact = new Contact({
        name:process.argv[3],
        number:process.argv[4]
    })
    
    contact.save().then(
        result => {
            console.log('contact saved to db')
            mongoose.connection.close()
        }
)
}


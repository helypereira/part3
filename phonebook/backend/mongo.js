import 'dotenv/config'
import mongoose from 'mongoose'

if (process.argv.length<3) {
  console.log('give password, name and number as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://almeidahely:${password}@cluster0.knuvllp.mongodb.net/phonebookApp?
  retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  number: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15
  }
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact(
  {
    name: `${name}`,
    number: `${number}`
  }
)


if(name === undefined || number === undefined){
  console.log("name and number not included")
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
} else {
  contact.save().then(() => {
  console.log(`Added ${name} number ${number} to Phonebook`)
  mongoose.connection.close()
})
}

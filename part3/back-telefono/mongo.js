const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://diegonina:${password}@cluster0.obuqwyc.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name:String,
  number:String
})

const Person = mongoose.model('Person',personSchema)

const person = new Person({
  name: name,
  number: number
})

if(process.argv.length === 3){
  Person.find({}).then(result => {
    console.log('Phonebook')
    result.forEach(element => {
      console.log(element.name, element.number)
    })
    mongoose.connection.close()
  })
}else if(process.argv.length === 5){
  person.save().then(() => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}else {
  console.log('Invalid number of arguments. Use: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}




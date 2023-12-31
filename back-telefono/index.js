const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "111",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Diego",
      "number": "111",
      "id": 5
    }
]

app.get('/api/persons',(req,res)=>{
  res.json(persons)
})

app.get('/api/info', (req, res) => {
  const info = {
    date: new Date(),
    info: persons.length
  };

  const htmlResponse = `
    <h1>Phone book has info for ${info.info} </h1>
    <p>${info.date}</p>
  `;
  
  res.send(htmlResponse);
});

app.get('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  const person = persons.find(element => element.id === id)

  if(person){
    res.json(person)
  }else{
    res.status(404).json({
      error: "Error to find the Person"
    })
  }
})

app.delete('/api/persons/:id', (req,res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(element=> element.id !== id)

  res.status(204).end()
})

function generateId(){
  return Math.floor(Math.random() * 1000000);
}


app.post('/api/persons', (req, res) => {
  const body = req.body;

  const findDuplicate = persons.find(element => element.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Please provide all information'
    });
  }

  if (findDuplicate) {
    return res.status(400).json({
      error: 'Name must be unique'
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId() 
  };

  persons = persons.concat(newPerson);

  res.status(201).json({
    message: 'Data created',
    data: newPerson
  });
});




const PORT = 3001
  
app.listen(PORT)

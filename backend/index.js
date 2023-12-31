const http = require('http')
const express = require('express')

const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]



app.get('/',(req,res)=>{
  res.send('<h1>Hello World!<h1/>')
})

app.get('/api/notes',(req,res)=>{
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note =>{
    return note.id === id
  })
  if(note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req,res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note=> note.id !== id)

  res.status(204).end()
})

function genereteId(){
  const maxId = notes.length > 0 ? Math.max(...notes.map(note=> note.id)) : 0
  const noteId = maxId + 1
  return noteId
}

app.post('/api/notes',(req,res)=>{
  const body = req.body

  if(!body.content){
   return res.status(404).json({
      error: "Error no content given"
    })
  }

  const note = {
    id: genereteId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  }
  notes = notes.concat(note)

  return res.status(200).json({
    message: "data created",
    data: note
  })

})


const PORT = 3001

app.listen(PORT)
console.log(`App listen on PORT ${PORT}`)
const express = require("express")
const bodyParser = require("body-parser")
const uuidv4 = require("uuid/v4")

const app = express()
const port = 4567
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE")
  res.header(
    "Access-control-Allow-headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next()
})

let items = [
  { id: uuidv4(), item: "learn About PWA" },
  { id: uuidv4(), item: "Make an awesome app" },
]

app.get("/item.json", (req, res) => {
  res.json(items)
})

app.post("/item.json", (req, res) => {
  items.push({
    id: uuidv4(),
    item: req.body.item,
  })
  res.json(items)
})

app.delete("/item.json", (req, res) => {
  items = items.filter((item) => item.id !== req.body.id)
  res.json(items)
})

app.listen(port, () => console.log(`Todo server listening on port ${port}`))

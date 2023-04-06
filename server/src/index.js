require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const taskRoutes = require('./routes/tasks.routes')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message })
})

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Running server on port ${port}`))

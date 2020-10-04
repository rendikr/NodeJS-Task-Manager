const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  console.log(req.method, req.path)

  next()
})

app.use((req, res, next) => {
  res.status(503).send('Site under maintenance, please try again later')
})

app.use(express.json()) // automatically parse any json
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const mongoose = require('mongoose')

// connection url followed by the db name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true, // also create the indexes to quickly access the data
  useFindAndModify: true
})

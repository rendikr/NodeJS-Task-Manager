const mongoose = require('mongoose')

// connection url followed by the db name
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true, // also create the indexes to quickly access the data
  useFindAndModify: true
})

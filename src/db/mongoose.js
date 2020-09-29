const mongoose = require('mongoose')

// connection url followed by the db name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true // also create the indexes to quickly access the data
})

// define the model
const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
})

// // prepare a new data for the User model
// const me = new User({
//   name: 'Rendi K.',
//   age: 'Thirty One'
// })

// // save the data to the database. the function returns a promise
// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.error('Error!', error)
// })

// define the model
const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

// prepare a new data for the User model
const newTask = new Task({
  description: 'Buy a new processor',
  completed: false
})

// save the data to the database. the function returns a promise
newTask.save().then(() => console.log(newTask)).catch((error) => console.error('Error!', error))

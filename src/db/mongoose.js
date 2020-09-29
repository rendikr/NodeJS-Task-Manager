const mongoose = require('mongoose')
const validator = require('validator')

// connection url followed by the db name
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true // also create the indexes to quickly access the data
})

// define the model
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email Address')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contains "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

// // prepare a new data for the User model
// const me = new User({
//   name: '         Rendi ',
//   email: 'MY@EMAIL.com         ',
//   password: ' HelloMyPassForTheApp31!#'
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
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// // prepare a new data for the User model
// const newTask = new Task({
//   description: 'Buy a new processor',
//   completed: false
// })

// // save the data to the database. the function returns a promise
// newTask.save().then(() => console.log(newTask)).catch((error) => console.error('Error!', error))

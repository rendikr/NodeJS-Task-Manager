require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5f734091d36f46281cb55ad4').then((task) => {
  console.log(task)

  // promise chaining
  // return another promise and make the result available as the next 'then'
  return Task.countDocuments({ completed: false })
}).then((count) => {
  console.log('Total task:', count)
}).catch((err) => {
  console.log(err)
})

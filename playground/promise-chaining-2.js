require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f734091d36f46281cb55ad4').then((task) => {
//   console.log(task)

//   // promise chaining
//   // return another promise and make the result available as the next 'then'
//   return Task.countDocuments({ completed: false })
// }).then((count) => {
//   console.log('Total task:', count)
// }).catch((err) => {
//   console.log(err)
// })

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('5f728e9118c94d0db49a5d76').then(count => console.log(count)).catch(err => console.log(err) )

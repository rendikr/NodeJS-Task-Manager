require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5f7293da5a25ff3150f826d2', {
  age: 1
}).then((user) => {
  console.log(user)

  // promise chaining
  // return another promise and make the result available as the next 'then'
  return User.countDocuments({ age: 1 })
}).then((count) => {
  console.log('Total user:', count)
}).catch((err) => {
  console.log(err)
})

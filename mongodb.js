const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error('Unable to connect to MongoDB database');
  }

  const db = client.db(databaseName)

  // find from 'users' collection filtered by the search parameter and update it
  db.collection('users').updateOne({
    _id: new ObjectID('5f6e172be43fb13424cd86c7')
  }, {
    $set: {
      name: 'Rendi' // change the value
    },
    $inc: {
      age: 1 // change the value by incrementing it's value
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.error(error)
  })

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) =>{
  //   console.error(error)
  // })

  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.error(error)
  })
})

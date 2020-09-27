const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error('Unable to connect to MongoDB database');
  }

  const db = client.db(databaseName)

  // find from 'users' collection filtered by the search parameter and delete it
  db.collection('users').deleteMany({
    age: 6
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.error(error)
  })

  db.collection('tasks').deleteOne({
    description: 'Buy arm rest'
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.error(error)
  })
})

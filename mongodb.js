const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error('Unable to connect to MongoDB database');
  }

  const db = client.db(databaseName)

  db.collection('users').findOne({ name: 'Citra', age: 33 }, (error, user) => {
    if (error) {
      console.error('Unable to fetch')
    }

    console.log(user)
  })

  // to query by the _id, need to wrap it as ObjectID
  db.collection('users').findOne({ _id: new ObjectID('5f6e187de82eae33505d4b9c') }, (error, user) => {
    if (error) {
      console.error('Unable to fetch')
    }

    console.log(user)
  })

  // find returns a cursor, and we can convert it as an array
  db.collection('users').find({ age: 30 }).toArray(( error, users ) => {
    if (error) {
      console.error('Unable to fetch');
    }

    console.log(users)
  })

  db.collection('users').find({ age: 30 }).count(( error, count ) => {
    if (error) {
      console.error('Unable to fetch');
    }

    console.log(count)
  })

  db.collection('tasks').findOne({ _id: new ObjectID('5f6e19308a16d11b48ef8a33') }, (error, task) => {
    if (error) {
      console.error('Unable to fetch');
    }

    console.log(task)
  })

  db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    if (error) {
      console.error('Unable to fetch');
    }

    console.log(tasks)
  })
})

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID() // generate a new ObjectID
console.log(id)
console.log(id.getTimestamp());
console.log(id.id);
console.log(id.id.length);
console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error('Unable to connect to MongoDB database');
  }

  const db = client.db(databaseName)

  // db.collection('users').insertOne({
  //   name: 'Rendi K.',
  //   age: 30
  // }, (error, result) => {
  //   if (error) {
  //     return console.error('Unable to insert user')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Citra',
  //     age: 33
  //   },
  //   {
  //     name: 'Revirza',
  //     age: 6
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.error('Unable to insert users document')
  //   }

  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Buy seat cover',
  //     completed: false
  //   },
  //   {
  //     description: 'Buy arm rest',
  //     completed: true
  //   },
  //   {
  //     description: 'Buy a new processor',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.error('Unable to insert tasks document')
  //   }

  //   console.log(result.ops)
  // })
})

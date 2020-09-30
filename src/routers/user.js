const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })

  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/users', async (req, res) => {
  // User.find({}).then((users) => {
  //   res.status(200).send(users)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/:id', async (req, res) => {
  // User.findById(req.params.id).then((user) => {
  //   if (!user) {
  //     return res.status(404).send('user not found')
  //   }

  //   res.status(200).send(user)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).send({ error: 'user not found' })
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).send({ error: 'user not found' })
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send({ error: 'user not found' })
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router

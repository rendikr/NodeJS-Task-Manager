const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body)

  // task.save().then(() => {
  //   res.status(201).send(task)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })

  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    })

    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', async (req, res) => {
  // Task.find({}).then((tasks) => {
  //   res.status(200).send(tasks)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', async (req, res) => {
  // Task.findById(req.params.id).then((task) => {
  //   if (!task) {
  //     return res.status(404).send('task not found')
  //   }

  //   res.status(200).send(task)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    // changing below method into more traditional way because it skips the middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    res.status(200).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router

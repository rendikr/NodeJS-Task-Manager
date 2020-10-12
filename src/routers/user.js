const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
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

    const token = await user.generateAuthToken()

    res.status(201).send({
      user,
      token
    })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)

    const token = await user.generateAuthToken()

    res.status(200).send({
      user,
      token
    })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })

    await req.user.save()

    res.status(200).send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.status(200).send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users', auth, async (req, res) => {
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

router.get('/users/me', auth, async (req, res) => {
  try {
    res.status(200).send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])

    await req.user.save()

    res.status(200).send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()

    res.status(200).send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  dest: 'avatars', // set the destination for the upload location
  limits: {
    fileSize: 1000000 // set the max file size in bytes. 1000000 bytes = 1 mb
  },
  fileFilter(req, file, cb) { // filters the file that runs automatically by multer
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image')) // upload failed & returns an error
    }
    // if (!file.originalname.endsWith('.jpg')) {
    //   return cb(new Error('Please upload a JPG Image')) // upload failed & returns an error
    // }

    cb(undefined, true) // upload success & accept the upload
    // cb(undefined, false) // upload success & reject the upload
  }
})

// check for field on request named 'avatar'. if there are any, upload its content using the multer upload
router.post('/users/me/avatar', upload.single('avatar'), async (req, res) => {
  res.status(200).send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

module.exports = router

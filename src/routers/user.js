const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')
const router = new express.Router()
const APP_ENV = process.env.APP_ENV || 'production'

router.post('/users', async (req, res) => {
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })

  try {
    const user = new User(req.body)
    await user.save()

    if (APP_ENV === 'production') {
      sendWelcomeEmail(user.email, user.name)
    }

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

    res.send({
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

    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users', auth, async (req, res) => {
  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])

    await req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()

    if (APP_ENV === 'production') {
      sendCancellationEmail(req.user.email, req.user.name)
    }

    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  // if dest property doesn't provided, it will pass the data through the function
  // dest: 'avatars', // set the destination for the upload location on the root of the project

  limits: {
    fileSize: 1000000 // set the max file size in bytes. 1000000 bytes = 1 mb
  },
  fileFilter(req, file, cb) { // filters the file that runs automatically by multer
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image')) // upload failed & returns an error
    }
    // if (!file.originalname.endsWith('.jpg')) {
    //   return cb(new Error('Please upload a JPG Image')) // upload failed (invalid file format) & returns an error
    // }

    cb(undefined, true) // upload success & accept the upload
    // cb(undefined, false) // upload success & reject the upload
  }
})

// check for field on request named 'avatar'. if there are any, upload its content using the multer upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // if multer doesn't provide the 'dest' property, the 'req' will have access to the file (req.file)
  // req.user.avatar = req.file.buffer

  // user sharp npm package to process the image before save
  // resize() will resize the image to specific size
  // png() convert the image to png file format
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()

  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error() // immediately jumps to the 'catch'
    }

    res.set('Content-Type', 'image/png') // res.set() => set the header of the response
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router

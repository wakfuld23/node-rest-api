const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const {userRoutes} = require('./routes/user')
const {uploadRoutes} = require('./routes/upload')
const {homeRoutes} = require('./routes/home')

const {headerMiddleware} = require('./middleware/header')
const {auth} = require('./middleware/auth')

const app = express()


app.use(express.json({ limit: '20mb', extended: true }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))
app.use(cors())

app.use('/', auth, headerMiddleware, homeRoutes)
app.use('/user', auth, userRoutes)
app.use('/upload', auth, upload.single('image'), uploadRoutes)

app.get('/', async (req, res)=>{
    res.json('Node rest api')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
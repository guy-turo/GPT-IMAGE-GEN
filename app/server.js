const PORT = 8000;
const express = require('express');

const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const fs = require('fs')
const multer = require('multer')


const { OpenAI } = require('openai')

const openai = new OpenAI({ apiKey: process.env.API_KEY })

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        console.log('file', file)
        cb(null, String(Date.now()) + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file')
let filePath
app.post('/images', async(req, res) => {
    const { message } = req.body
    try {

        const response = await openai.images.generate({
            prompt: message,
            n: 5,
            size: "256x256"
        })
        console.log(response.data)
        res.json(response.data)
    } catch (error) {
        console.error(error)
    }

})

app.post('/upload', async(req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        filePath = req.file.path

    })
})

app.post('/variations', async(req, res) => {

    try {
        const response = await openai.images.createVariation({
            image: fs.createReadStream(filePath),
            n: 10,
            size: '256x256',
        });
        console.log(response.data);
        res.send(response.data)
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, () => { console.log('Server running on port ' + PORT) })
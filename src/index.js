const express = require('express')
const AWS = require('aws-sdk')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/status', (req, res) => res.send({ status: "ok" }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
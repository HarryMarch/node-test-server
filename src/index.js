const express = require('express')
const appUtility = require('./utilities/app.utility');

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/status', (req, res) => {
    appUtility.log();
    res.send({ status: "ok" })
})

app.get('/time', (req, res) => {
    res.send({ time: appUtility.date() })
})

app.get('/read', (req, res) => {
    try {
        appUtility.read_log();
        res.send({ status: "read" });
    } catch(error) {
        res.send({ error: error.message });
    }    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
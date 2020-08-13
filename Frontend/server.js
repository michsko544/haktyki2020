const express = require('express')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect')
const app = express()
const PORT = process.env.PORT || 80

app.use(sslRedirect())

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)

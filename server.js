var express = require('express')
var path = require('path')
var http = require('http')
var bodyParser = require('body-parser')

require('dotenv').config();

var db = require('./server/mongoose.js');

var api = require('./server/routes/api');

// var apiCalls = require('./server/api-calls/index');
// apiCalls.getPenguinData('Marcel Proust');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'src')))

app.use('/api', api)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'))
})

var port = process.env.PORT || '3000'
app.set('port', port)

var server = http.createServer(app)

server.listen(port, () => console.log('Chilling on port ', + port))

const path     = require('path'),
      http     = require('http'),
      express  = require('express'),
      socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8000

const app = express()
const server = http.createServer(app)

let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
	console.log('New User Connected ')

	socket.emit('newEmail', {
		from: 'jim@ex.com',
		text: 'Yo yo yo yo yo'
	})

	socket.on('createEmail', newEmail => {
		console.log('create email', newEmail)
	})

	socket.on('disconnect', function () {
		console.log('User Disconnected')
	})
})

server.listen(port, () => {
	console.log(`Server is up on ${port}`)
})

const jwt = require("jsonwebtoken")

const apiKey = 'RVceQw.G7vKkQ:DE7A4uhwcWeyT4aC'
const appId = 'RVceQw', keyId = 'G7vKkQ', keySecret = 'DE7A4uhwcWeyT4aC'
const ttlSeconds = 60

const loginPayload = {'x-ably-capability': JSON.stringify({ '*': ['publish', 'subscribe'] }) }
const anonPayload = {'x-ably-capability': JSON.stringify({ 'greetings': ['subscribe'] }) }

const jwtOptions = { expiresIn: ttlSeconds, keyid: `${appId}.${keyId}` }

const express = require('express'), app = express()

app.use('/', express.static(__dirname))

app.get('/auth', function (req, res) {

	//console.log('Sucessfully connected to the server auth endpoint')

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	const {storedToken} = req.query
	console.log({storedToken})

	const jwtPayload = (storedToken === 'login') ? loginPayload : anonPayload

	jwt.sign(jwtPayload, keySecret, jwtOptions, function (err, tokenId) {

		console.log('JSON Web Token signed by auth server')

		if (err) { console.trace() }
		else {

			res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
			res.setHeader('Content-Type', 'application/json')

			console.log('Sending signed JWT token back to client')

			res.send(JSON.stringify(tokenId))
		}

	})

})

app.listen(4100, function () {

	console.log('Web server listening on port 4100')

	//const ablyRest = require('ably').Rest({key: apiKey})
	//const channel = ablyRest.channels.get("sidecar:test-message")
	//
	//setInterval(() => {
	//
	//	console.log('publish message....', Date.now())
	//	channel.publish('create', {text: "Man United" })
	//
	//	// - todo: publish quickstart -> greeting
	//}, 2000)
})
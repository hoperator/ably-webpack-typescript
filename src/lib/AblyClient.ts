
import * as Ably from 'ably'
import {AblyAuthService} from './AblyAuthService'
//const Ably = require('ably/browser/static/ably-commonjs.js')

let ably
let lastToken

const authCallback = async (tokenParams, cb) => {

	try {
		const token = await AblyAuthService.authorizeToken('login')
		console.log('AUTH TOKEN: ', token)
		cb(null, token)

		lastToken = token

	} catch (err) {
		cb(err)
	}
}

const getAbly = () => {

	if (!ably) {
		ably = new Ably.Realtime({

			autoConnect: false,
			authCallback,
			//token:
			//useAuthToken: true,
			//authUrl: 'http://localhost:4100/auth',
			//authMethod: 'POST',
			//authParams: {storedToken}
		})

		ably.connection.on((details) => {
			console.log('---CONNECTION EVT: ', details)
		})
	}



	return ably
}


//var realtime = new Ably.Realtime({ authCallback: function(tokenParams, callback) {
//		$('#auth-status').append('<li>authCallback called with tokenParams: ' + JSON.stringify(tokenParams) + '</li>');
//		ablyRest.auth.requestToken(function(err, token) {
//			$('#auth-status').append('<li>Token obtained and returned in callback from authCallback: ' + JSON.stringify(token) + '</li>');
//			callback(err, token);
//		});
//	}});
//


export const AblyClient = {

	auth() {
		getAbly().auth.authorize()
	},

	connect() {

		getAbly().connect()
		//ably = new Ably.Realtime({
		//
		//	autoConnect: false,
		//	//useAuthToken: true,
		//	//authUrl: 'http://localhost:4100/auth',
		//	//authMethod: 'POST',
		//	//authParams: {storedToken}
		//})

		//ably.connection.once('connected', function () {
		//
		//	console.log('Client connected to Ably using JWT')
		//	//alert("Client successfully connected Ably using JWT auth");
		//
		//	var user = ably.auth.tokenDetails
		//	console.log({user})
		//})

		const channel = ably.channels.get('quickstart')

		channel.subscribe('greeting', function(message) {
			console.log("Received a greeting message in realtime: ", {message})
		})

		console.log('Fetching JWT token from auth server')
	},

	disconnect() { getAbly().close() }

}
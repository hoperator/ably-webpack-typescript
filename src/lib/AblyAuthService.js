const jwt = require("jsonwebtoken")

const appId = '_appId_', keyId = '_keyId_', keySecret = '_keySecret_'
const ttlSeconds = 20

const loginPayload = {'x-ably-capability': JSON.stringify({ '*': ['publish', 'subscribe'] }) }
const anonPayload = {'x-ably-capability': JSON.stringify({ 'greetings': ['subscribe'] }) }

const jwtOptions = { expiresIn: ttlSeconds, keyid: `${appId}.${keyId}` }


export const AblyAuthService = {

	async authorizeToken(userType) {

		//const payload = (userType === 'login') ? loginPayload : anonPayload
		const payload = {userId:'user-id'}

		return new Promise((resolve, reject) => {

			jwt.sign(payload, keySecret, jwtOptions, function (err, tokenId) {

				console.log('JSON Web Token signed by auth server')

				if (err) {
					console.trace()
					reject(err)
				}
				else {
					resolve(tokenId)
				}
			})
		})
	}
}
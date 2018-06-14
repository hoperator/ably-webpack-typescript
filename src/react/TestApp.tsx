
import * as React from 'react'
import {AblyClient} from '../lib/AblyClient'

const clickConnect = () => AblyClient.connect()
const clickDisconnect = () => AblyClient.disconnect()
const clickAuth = () => AblyClient.auth()


export class TestApp extends React.Component<any, any> {

	componentDidMount() {
		console.log('TestApp')
	}
	render() {
		return (
			<div>

				<h1>welcome to the test app</h1>

				<button onClick={clickConnect}>Connect</button>
				<button onClick={clickDisconnect}>Disconnect</button>
				<button onClick={clickAuth}>Auth</button>

			</div>
		)
	}
}
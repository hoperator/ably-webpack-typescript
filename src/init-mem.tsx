import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'

import {TestApp} from './react/TestApp'


let rootEle

const render = (rootComponent) => {

	if (rootEle) ReactDOM.unmountComponentAtNode(rootEle)

	rootEle = document.querySelector('#root-ele')
	ReactDOM.render(rootComponent, rootEle)
}

const component = <TestApp/>
render(component)

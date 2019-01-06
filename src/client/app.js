import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader'

import Home from './components/Home'
const rootNode = document.getElementById("app")
const App = props => <Home />

const HotLoader = hot(module)(App)

ReactDOM.render(<HotLoader />, rootNode)
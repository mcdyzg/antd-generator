import React from 'react'
import { hot } from 'react-hot-loader'
import {
	HashRouter,
	BrowserRouter,
	Route,
	Switch,
	Link,
	Redirect,
} from 'react-router-dom'
import { Button, Row, Col } from 'antd'
import '@pages/base.css'
import './App.scss'
import SiderMenu from '@comp/SiderMenu'
import OptBar from '@pages/OptBar'
import Content from '@pages/Content'
import store from '@store'
import { Provider } from 'ruex'

class App extends React.Component {
	componentDidMount() {}
	render() {
		return (
			<Provider store={store}>
				<HashRouter>
					<div className="app-wrap">
						<SiderMenu />
						<Content />
						<OptBar />
					</div>
				</HashRouter>
			</Provider>
		)
	}
}

export default hot(module)(App)

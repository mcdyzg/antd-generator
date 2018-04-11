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
import DynamicImport from '@modules/DynamicImport'
const Content = DynamicImport(() =>
	import(/* webpackChunkName: "Content" */ '@pages/Content'),
)
// import Content from '@pages/Content'
import store from '@store'
import { Provider } from 'ruex'

import SiderMenu from '@modules/SiderMenu'
import Header from '@modules/Header'
import OptBar from '@pages/OptBar'

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<HashRouter>
					<div className="app-wrap">
						<SiderMenu />
						<div className="container-wrap">
							<Header />
							<Content />
							<OptBar />
						</div>
					</div>
				</HashRouter>
			</Provider>
		)
	}
}

export default hot(module)(App)

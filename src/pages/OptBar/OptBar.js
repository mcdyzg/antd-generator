import React, { Component } from 'react'
import './OptBar.scss'
// import {Modal} from 'antd'
import Grid from '@comp/Grid/socket'
import SearchBar from '@comp/SearchBar/socket'
import BasicTable from '@comp/BasicTable/socket'
import BasicForm from '@comp/BasicForm/socket'
import SiderMenu from '@comp/SiderMenu/socket'
import Carousel from '@comp/Carousel/socket'

class OptBar extends Component {
	render() {
		return (
			<div className="optbar-wrap">
				<SiderMenu />
				<Grid />
				<SearchBar />
				<BasicTable />
				<BasicForm />
				<Carousel />
			</div>
		)
	}
}

export default OptBar

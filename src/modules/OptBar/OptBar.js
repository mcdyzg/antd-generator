import React, { Component } from 'react'
import './OptBar.scss'
// import {Modal} from 'antd'

import SearchBar from '@comp/SearchBar/socket'
import CustomTable from '@comp/CustomTable/socket'
import CustomForm from '@comp/CustomForm/socket'
import CustomCarousel from '@comp/CustomCarousel/socket'
import Breadcrumb from '@comp/Breadcrumb/socket'
import Pagination from '@comp/Pagination/socket'
import Steps from '@comp/Steps/socket'

import Header from '@modules/Header/socket'
import SiderMenu from '@modules/SiderMenu/socket'
import Grid from '@modules/Grid/socket'
import Preview from '@modules/Preview/socket'

class OptBar extends Component {
	render() {
		return (
			<div className="optbar-wrap">
				<Preview />
				<SiderMenu />
				<Grid />
				<SearchBar />
				<CustomTable />
				<CustomForm />
				<CustomCarousel />
				<Header />
				<Breadcrumb />
				<Pagination />
				<Steps />
			</div>
		)
	}
}

export default OptBar

import React, { Component } from 'react'
import './OptBar.scss'

// 基础组件上允许自定义配置的功能组件
import SearchBar from '@comp/SearchBar/socket'
import CustomTable from '@comp/CustomTable/socket'
import CustomForm from '@comp/CustomForm/socket'
import CustomCarousel from '@comp/CustomCarousel/socket'
import CustomPagination from '@comp/CustomPagination/socket'
import CustomSteps from '@comp/CustomSteps/socket'
import CustomBreadcrumb from '@comp/CustomBreadcrumb/socket'

// 系统组件
import Header from '@modules/Header/socket'
import SiderMenu from '@modules/SiderMenu/socket'
import Grid from '@modules/Grid/socket'
import Preview from '@modules/Preview/socket'
import AntdSocket from '@modules/AntdSocket/socket'

class OptBar extends Component {
	render() {
		const antd = [
			'Breadcrumb',
			'Pagination',
			'Steps',
			'Button',
			'Dropdown',
			'Cascader',
			'Checkbox',
			'DatePicker',
			'MonthPicker',
			'RangePicker',
		]
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
				<CustomPagination />
				<CustomSteps />
				<CustomBreadcrumb />

				{/* antd原生组件 */}
				{antd.map((name, index) => (
					<AntdSocket key={index} name={name} />
				))}
			</div>
		)
	}
}

export default OptBar

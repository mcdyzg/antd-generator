import React, { PureComponent } from 'react'
import './SiderMenu.scss'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'ruex'
import { isArray } from '@utils'

@withRouter
class SiderMenu extends PureComponent {
	constructor(props) {
		super(props)
		this.state = this.setDefaultSelectedKey(this.props)
		this.defaultOpenKeys = []
	}

	// componentWillReceiveProps(nextProps) {
	// 	this.setState(this.setDefaultSelectedKey(nextProps))
	// }

	setDefaultSelectedKey = props => {
		const { location = {} } = props
		let pathname = location.pathname
		this.props.setCurrentRoute(pathname)
		return {
			selectedKeys: [pathname],
		}
	}

	handleClick = e => {
		const { history } = this.props
		history.push(e.key)
		this.props.setCurrentRoute(e.key)
		this.setState({
			selectedKeys: [e.key],
		})
	}

	getRouteMenu = (routes, parent_path = '') => {
		return routes.map(item => {
			if (item.routes && isArray(item.routes)) {
				this.defaultOpenKeys.push(item.path)
				return (
					<SubMenu
						key={item.path}
						title={
							<span>
								<Icon type="file-text" />
								{item.name}
							</span>
						}
					>
						{this.getRouteMenu(item.routes, item.path)}
					</SubMenu>
				)
				return this.getRouteMenu(item.routes)
			} else {
				return (
					<Menu.Item key={`${parent_path}${item.path}`}>
						<Icon type="file-text" />
						{item.name}
					</Menu.Item>
				)
			}
		})
	}
	render() {
		const { SiderMenu } = this.props
		if (SiderMenu.open) {
			return (
				<div className="sider-wrap">
					<div className="sider-header">{SiderMenu.title}</div>
					<Menu
						onClick={this.handleClick}
						selectedKeys={this.state.selectedKeys}
						defaultOpenKeys={this.defaultOpenKeys}
						mode="inline"
						theme="dark"
					>
						{this.getRouteMenu(SiderMenu.routes)}
					</Menu>
				</div>
			)
		} else {
			return null
		}
	}
}

// export default SiderMenu

const mapStateToProps = state => ({
	SiderMenu: state.SiderMenu,
})

const mapMutationsToProps = ['setCurrentRoute']

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	SiderMenu,
)

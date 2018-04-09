import React from 'react'
import { Modal, Input, Switch, Icon, Tree, Divider, Button } from 'antd'
const TreeNode = Tree.TreeNode
import { connect } from 'ruex'

class SideMenu extends React.Component {
	state = {
		visible: false,
		grid: null,
	}

	handleOk = () => {
		this.props.addToLayout(this.state.grid)
		this.setState({ visible: false })
	}

	handleCancel = () => {
		this.setState({ visible: false })
	}

	getRouteTree = (routes, parent_path = '') => {
		return routes.map(item => (
			<TreeNode title={item.name} key={`${parent_path}${item.path}`}>
				{item.routes && this.getRouteTree(item.routes, item.path)}
			</TreeNode>
		))
	}

	onSelect = selectedKeys => {
		console.log(selectedKeys)
	}

	render() {
		const { visible, grid } = this.state
		const { SiderMenu } = this.props
		return (
			<div className="">
				<div onClick={() => this.setState({ visible: true })}>
					左侧导航
				</div>
				<Modal
					title="左侧导航"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Switch
						onChange={this.props.toggleSiderMenuOpen}
						checkedChildren="开"
						unCheckedChildren="关"
						checked={SiderMenu.open}
					/>
					<Divider />
					<Tree
						showLine
						// defaultExpandedKeys={['0-0-0']}
						onSelect={this.onSelect}
					>
						{this.getRouteTree(SiderMenu.routes)}
					</Tree>
					<Divider />
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	SiderMenu: state.SiderMenu,
})

const mapMutationsToProps = ['toggleSiderMenuOpen']

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	SideMenu,
)

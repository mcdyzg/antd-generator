import React from 'react'
import { Modal, Input } from 'antd'
import './CustomBreadcrumb.scss'
import { connect } from 'ruex'

class CustomBreadcrumb extends React.Component {
	state = {
		visible: false,
	}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'CustomBreadcrumb',
		})
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}

	render() {
		const { visible } = this.state
		return (
			<div className="">
				<div onClick={this.handleOk}>自定义面包屑</div>
				<Modal
					title="自定义面包屑"
					visible={visible}
					onOk={this.handleCancel}
					onCancel={this.handleCancel}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomBreadcrumb,
)

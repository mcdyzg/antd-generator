import React from 'react'
import { Modal, Input } from 'antd'
import './CustomSteps.scss'
import { connect } from 'ruex'

class CustomSteps extends React.Component {
	state = {
		visible: false,
	}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'CustomSteps',
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
				<div onClick={this.handleOk}>自定义步骤条</div>
				<Modal
					title="自定义步骤条"
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
	CustomSteps,
)

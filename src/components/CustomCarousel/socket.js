import React from 'react'
import { Modal, Input } from 'antd'
import './CustomCarousel.scss'
import { connect } from 'ruex'

class CustomCarousel extends React.Component {
	state = {
		visible: false,
	}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'CustomCarousel',
		})
	}

	render() {
		const { visible } = this.state
		return (
			<div className="">
				<div onClick={this.handleOk}>自定义走马灯</div>
				<Modal
					title="自定义走马灯"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					111
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomCarousel,
)

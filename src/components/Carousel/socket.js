import React from 'react'
import { Modal, Input } from 'antd'
import './Carousel.scss'
import { connect } from 'ruex'

class Carousel extends React.Component {
	state = {
		visible: false,
	}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'Carousel',
		})
	}

	render() {
		const { visible } = this.state
		return (
			<div className="">
				<div onClick={this.handleOk}>走马灯</div>
				<Modal
					title="走马灯"
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
	Carousel,
)

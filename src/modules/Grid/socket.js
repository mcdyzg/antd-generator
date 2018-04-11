import React from 'react'
import { Modal, Input } from 'antd'
import { connect } from 'ruex'

class Grid extends React.Component {
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

	render() {
		const { visible, grid } = this.state
		return (
			<div className="">
				<div onClick={() => this.setState({ visible: true })}>栅格</div>
				<Modal
					title="栅格"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Input
						value={grid}
						onChange={e => this.setState({ grid: e.target.value })}
						placeholder="输入栅格"
					/>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	layout: state.layout,
	currentEdit: state.currentEdit,
})

const mapMutationsToProps = []

const mapActionsToProps = ['addToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Grid,
)

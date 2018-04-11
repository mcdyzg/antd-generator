import React from 'react'
import { Modal, Input } from 'antd'
import './CustomTable.scss'
import { connect } from 'ruex'

class CustomTable extends React.Component {
	state = {}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'CustomTable',
		})
	}

	render() {
		return (
			<div className="">
				<div onClick={this.handleOk}>自定义表格</div>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomTable,
)

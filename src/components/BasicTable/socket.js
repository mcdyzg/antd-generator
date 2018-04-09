import React from 'react'
import { Modal, Input } from 'antd'
import './BasicTable.scss'
import { connect } from 'ruex'

class BasicTable extends React.Component {
	state = {}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'BasicTable',
		})
	}

	render() {
		return (
			<div className="">
				<div onClick={this.handleOk}>基本表格</div>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	BasicTable,
)

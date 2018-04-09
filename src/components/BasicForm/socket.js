import React from 'react'
import { Modal, Input } from 'antd'
import './BasicForm.scss'
import { connect } from 'ruex'

class BasicForm extends React.Component {
	state = {}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'BasicForm',
		})
	}

	render() {
		return (
			<div className="">
				<div onClick={this.handleOk}>基本表单</div>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	BasicForm,
)

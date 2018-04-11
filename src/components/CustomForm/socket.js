import React from 'react'
import { Modal, Input } from 'antd'
import './CustomForm.scss'
import { connect } from 'ruex'

class CustomForm extends React.Component {
	state = {}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'CustomForm',
		})
	}

	render() {
		return (
			<div className="">
				<div onClick={this.handleOk}>自定义表单</div>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomForm,
)

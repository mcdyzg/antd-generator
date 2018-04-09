import React from 'react'
import { Modal, Input } from 'antd'
import { connect } from 'ruex'

class SearchBar extends React.Component {
	state = {}

	handleOk = () => {
		this.props.addComponentToLayout({
			type: 'component',
			name: 'SearchBar',
		})
	}

	render() {
		return (
			<div className="">
				<div onClick={this.handleOk}>搜索框</div>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	SearchBar,
)

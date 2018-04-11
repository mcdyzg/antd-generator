import { Button, Table, Spin } from 'antd'
import './Header.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'

class Header extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		const { open, title } = this.props.Header
		if (open) {
			return <header className="header-wrap">{title}</header>
		} else {
			return null
		}
	}
}

const mapStateToProps = state => ({
	Header: state.Header,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Header,
)

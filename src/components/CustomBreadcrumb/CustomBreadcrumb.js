import { Breadcrumb } from 'antd'
import './CustomBreadcrumb.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'

class CustomBreadcrumb extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		return (
			<div className="breadcrumb-wrap">
				<Breadcrumb>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a href="">Application Center</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<a href="">Application List</a>
					</Breadcrumb.Item>
					<Breadcrumb.Item>An Application</Breadcrumb.Item>
				</Breadcrumb>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	CustomBreadcrumb: state.CustomBreadcrumb,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomBreadcrumb,
)

import { Pagination } from 'antd'
import './CustomPagination.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'

class CustomPaginationC extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		return (
			<div className="pagination-wrap">
				<Pagination showQuickJumper defaultCurrent={2} total={500} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	CustomPagination: state.CustomPagination,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomPaginationC,
)

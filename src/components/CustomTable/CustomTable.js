import { Button, Table, Spin } from 'antd'
import './CustomTable.scss'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { connect } from 'ruex'

class CustomTable extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.requestCustomTable()
	}

	search = (pagination, filters, sorter) => {
		const { pageSize, current: pageNum } = pagination
		this.props.searchCustomTable({
			pageSize,
			pageNum,
		})
	}

	render() {
		const columns = [
			{
				title: '名称',
				dataIndex: 'name',
			},
			{
				title: '总分',
				dataIndex: 'total',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render: text => (
					<div className="">
						{moment(text).format('YYYY-MM-DD HH:mm:ss')}
					</div>
				),
			},
		]
		const {
			list,
			pageNum,
			pageSize,
			total,
			loading,
		} = this.props.CustomTable
		return (
			<div className="custom-table-wrap">
				<Spin spinning={loading}>
					<Table
						rowKey="_id"
						onChange={this.search}
						pagination={{
							// showTotal: (total, range) => `共 ${+total} 条`,
							pageSize: +pageSize,
							current: +pageNum,
							total,
						}}
						dataSource={list}
						columns={columns}
					/>
				</Spin>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		// CustomTable: state.CustomTable,
		CustomTable: state[ownProps.id],
	}
}

const mapMutationsToProps = []

// const mapActionsToProps = ['searchCustomTable', 'requestCustomTable']

const mapActionsToProps = ownProps => {
	return {
		searchCustomTable: ownProps.id + '/searchCustomTable',
		requestCustomTable: ownProps.id + '/requestCustomTable',
	}
}

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomTable,
)

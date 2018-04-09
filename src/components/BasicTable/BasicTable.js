import { Button, Table, Spin } from 'antd'
import './BasicTable.scss'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { connect } from 'ruex'

class BasicTable extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.requestBasicTable()
	}

	search = (pagination, filters, sorter) => {
		const { pageSize, current: pageNum } = pagination
		this.props.searchBasicTable({
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
		} = this.props.BasicTable
		return (
			<div className="basic-table-wrap">
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
		// BasicTable: state.BasicTable,
		BasicTable: state[ownProps.id],
	}
}

const mapMutationsToProps = []

// const mapActionsToProps = ['searchBasicTable', 'requestBasicTable']

const mapActionsToProps = ownProps => {
	return {
		searchBasicTable: ownProps.id + '/searchBasicTable',
		requestBasicTable: ownProps.id + '/requestBasicTable',
	}
}

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	BasicTable,
)

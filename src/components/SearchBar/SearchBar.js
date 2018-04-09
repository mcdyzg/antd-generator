import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, Spin } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import './SearchBar.scss'
import { connect } from 'ruex'

class SearchBar extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.requestSearchBarList()
	}

	getFields() {
		const { list } = this.props.SearchBar
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		}
		return (
			<Col span={8}>
				<FormItem {...formItemLayout} label={`题型`}>
					{getFieldDecorator('type', {
						rules: [
							{
								// required: true,
								message: `请选择题型`,
							},
						],
					})(
						<Select size="default" placeholder={`请选择题型`}>
							{list.map((item, index) => (
								<Option key={index} value={item.name}>
									{item.cn_name}
								</Option>
							))}
						</Select>,
					)}
				</FormItem>
			</Col>
		)
	}

	// 重置筛选条件
	handleReset = () => {
		this.props.form.resetFields()
	}

	handleSearch = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				alert(JSON.stringify(values))
			}
		})
	}

	render() {
		const { SearchBar } = this.props
		return (
			<div className="search-wrap">
				<Spin spinning={SearchBar.loading}>
					<Form
						className="ant-advanced-search-form"
						onSubmit={this.handleSearch}
					>
						<div
							style={{
								margin: '-9px 0 10px -3px',
								fontSize: '16px',
							}}
						>
							筛选条件
						</div>
						<Row>{this.getFields()}</Row>
						<Row>
							<Col span={24} style={{ textAlign: 'right' }}>
								<Button type="primary" htmlType="submit">
									搜索
								</Button>
								<Button
									style={{ marginLeft: 8 }}
									onClick={this.handleReset}
								>
									重置
								</Button>
							</Col>
						</Row>
					</Form>
				</Spin>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	SearchBar: state.SearchBar,
})

const mapMutationsToProps = []

const mapActionsToProps = ['requestSearchBarList']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Form.create()(SearchBar),
)

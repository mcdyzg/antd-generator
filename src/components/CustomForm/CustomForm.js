import React, { PureComponent } from 'react'
import {
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	Card,
	InputNumber,
	Radio,
	Icon,
	Tooltip,
	Spin,
	Row,
	Col,
} from 'antd'
const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
import './CustomForm.scss'
import { connect } from 'ruex'

class CustomForm extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.requestCustomFormList()
	}

	getFields() {
		const { list } = this.props.CustomForm
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
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 7 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
				md: { span: 10 },
			},
		}

		const submitFormLayout = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 10, offset: 7 },
			},
		}
		const { CustomForm } = this.props
		const { loading } = { loading: true }
		const { getFieldDecorator, getFieldValue } = this.props.form
		return (
			<div className="basic-form-wrap">
				<Card bordered={false}>
					<Form
						onSubmit={this.handleSubmit}
						// hideRequiredMark
						style={{ marginTop: 8 }}
					>
						<FormItem {...formItemLayout} label="标题">
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: '请输入标题',
									},
								],
							})(<Input placeholder="请输入标题" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="起止日期">
							{getFieldDecorator('date', {
								rules: [
									{
										required: true,
										message: '请选择起止日期',
									},
								],
							})(
								<RangePicker
									style={{ width: '100%' }}
									placeholder={['开始日期', '结束日期']}
								/>,
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="文本区域">
							{getFieldDecorator('textarea', {
								rules: [
									{
										required: true,
										message: '请输入文本',
									},
								],
							})(
								<TextArea
									style={{ minHeight: 32 }}
									placeholder="请输入文本"
									rows={4}
								/>,
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label={
								<span>
									数字输入框<em>（选填）</em>
								</span>
							}
						>
							{getFieldDecorator('inputnumber')(
								<InputNumber placeholder="请输入数字" />,
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="单选框"
							// help="客户、邀评人默认被分享"
						>
							<div>
								{getFieldDecorator('public', {
									initialValue: '1',
								})(
									<Radio.Group>
										<Radio value="1">选项1</Radio>
										<Radio value="2">选项2</Radio>
										<Radio value="3">选项3</Radio>
									</Radio.Group>,
								)}
							</div>
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="下拉列表"
							style={{ marginBottom: 0 }}
						>
							{getFieldDecorator('checkbox')(
								<Select
									// mode="multiple"
									placeholder="下拉列表"
									style={{
										margin: '8px 0',
									}}
								>
									<Option value="1">同事甲</Option>
									<Option value="2">同事乙</Option>
									<Option value="3">同事丙</Option>
								</Select>,
							)}
						</FormItem>
						<FormItem
							{...submitFormLayout}
							style={{ marginTop: 32 }}
						>
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
							>
								提交
							</Button>
							<Button style={{ marginLeft: 8 }}>保存</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		CustomForm: state[ownProps.id],
	}
}

const mapMutationsToProps = []

// const mapActionsToProps = ['searchCustomTable', 'requestCustomTable']

const mapActionsToProps = ownProps => {
	return {
		requestCustomFormList: ownProps.id + '/requestCustomFormList',
	}
}

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Form.create()(CustomForm),
)

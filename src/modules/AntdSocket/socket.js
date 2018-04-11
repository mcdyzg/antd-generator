import React from 'react'
import { connect } from 'ruex'
import { Modal, Input, Button, Form, Steps as StepsC, Icon } from 'antd'
const FormItem = Form.Item
import produce from 'immer'
const Step = StepsC.Step

// antd原生组件的套接层
class AntdSocket extends React.Component {
	state = {
		visible: false,
		// antd组件的默认配置项
		// 面包屑
		Breadcrumb: '首页/子页面一',
		// 分页总数
		Pagination: 500,
		// 步骤条组件
		Steps: {
			current: 1,
			steps: [
				{
					title: 'Finished',
					description: 'This is a description.',
				},
				{
					title: 'In Progress',
					description: 'This is a description.',
				},
				{
					title: 'Waiting',
					description: 'This is a description.',
				},
			],
		},
	}

	handleOk = () => {
		let data = null
		switch (this.props.name) {
			case 'Breadcrumb':
				data = this.state[this.props.name].split('/')
				break
			case 'Pagination':
				data = this.state[this.props.name]
				break
			case 'Steps':
				data = this.state[this.props.name]
				break
			default:
		}
		this.props.addComponentToLayout({
			type: 'component',
			name: this.props.name,
			// 本模块直接调用antd组件，不需要自定义配置，因此不需要store
			noNeedStore: true,
			// 本设置存放antd原生组件自定义配置数据
			customSetting: data,
		})
		this.setState({ visible: false })
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}

	getCustomSettingDom = () => {
		const { name } = this.props
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 18 },
			},
		}
		let dom = null
		switch (name) {
			case 'Breadcrumb':
				const { Breadcrumb } = this.state
				dom = (
					<FormItem {...formItemLayout} label="面包屑配置">
						<Input
							value={Breadcrumb}
							onChange={e => {
								this.setState({
									Breadcrumb: e.target.value,
								})
							}}
						/>
					</FormItem>
				)
				break
			case 'Pagination':
				const { Pagination } = this.state
				dom = (
					<FormItem {...formItemLayout} label="面包屑配置">
						<Input
							value={+Pagination}
							onChange={e => {
								this.setState({
									Pagination: +e.target.value.replace(
										/\D/g,
										'',
									),
								})
							}}
						/>
					</FormItem>
				)
				break
			case 'Steps':
				const { Steps = {} } = this.state
				dom = (
					<div className="">
						<FormItem {...formItemLayout} label="steps">
							<StepsC
								direction="vertical"
								current={Steps.current}
							>
								{Steps.steps.map((item, index) => {
									if (!item) return null
									return (
										<Step
											onClick={() => {
												this.setState(
													produce(draft => {
														draft.Steps.current = index
													}),
												)
											}}
											key={index}
											title={
												<div>
													<Input
														value={item.title}
														onChange={e => {
															let value =
																e.target.value
															this.setState(
																produce(
																	draft => {
																		draft.Steps.steps[
																			index
																		].title = value
																	},
																),
															)
														}}
													/>
													<Icon
														style={{
															position:
																'absolute',
															top: '8px',
															right: '-11px',
														}}
														onClick={() => {
															this.setState(
																produce(
																	draft => {
																		draft.Steps.steps.splice(
																			index,
																			1,
																		)
																	},
																),
															)
														}}
														type="close"
													/>
												</div>
											}
											description={
												<Input
													value={item.description}
													onChange={e => {
														let value =
															e.target.value
														this.setState(
															produce(draft => {
																draft.Steps.steps[
																	index
																].description = value
															}),
														)
													}}
												/>
											}
										/>
									)
								})}
							</StepsC>
						</FormItem>
					</div>
				)
				break
			default:
		}
		return dom
	}

	render() {
		const { visible } = this.state
		const { name } = this.props
		return (
			<div className="">
				<div
					onClick={() => {
						this.setState({
							visible: true,
							customSetting: null,
						})
					}}
				>
					{name}
				</div>
				<Modal
					title={name}
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{this.getCustomSettingDom()}
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => {}

const mapMutationsToProps = []

const mapActionsToProps = ['addComponentToLayout']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	AntdSocket,
)

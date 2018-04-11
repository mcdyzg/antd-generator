import React, { Component } from 'react'
import './Content.scss'
import {
	Menu,
	Dropdown,
	Button,
	Row,
	Col,
	Modal,
	Breadcrumb,
	Pagination,
	Steps,
	Cascader,
	Checkbox,
	DatePicker,
} from 'antd'
import { connect } from 'ruex'
import SearchBar from '@comp/SearchBar'
import CustomTable from '@comp/CustomTable'
import CustomForm from '@comp/CustomForm'
import CustomCarousel from '@comp/CustomCarousel'
import CustomBreadcrumb from '@comp/CustomBreadcrumb'
import CustomPagination from '@comp/CustomPagination'
import CustomSteps from '@comp/CustomSteps'
const confirm = Modal.confirm
import { isPlainObject } from '@utils'
const Step = Steps.Step
const { MonthPicker, RangePicker } = DatePicker

class Content extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	// 将当前的块标记成正在编辑的
	markCurrentEdit = (id, path, currentRoute, e) => {
		// 阻止冒泡
		e.stopPropagation()

		this.props.markCurrentEdit({
			id,
			path,
			currentRoute,
		})
	}

	showDeleteModal = (id, path, e) => {
		e.stopPropagation()
		const t = this
		confirm({
			maskClosable: true,
			title: 'Are you sure delete this component?',
			// content: 'Some descriptions',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				t.props.deleteComponent({ id, path })
			},
			onCancel() {
				console.log('Cancel')
			},
		})
	}

	transLayoutToDom = (layout, father_path) => {
		const t = this
		const { currentRoute, state } = t.props
		const currentLayout = state[currentRoute]
		return Object.keys(layout).map((id, index) => {
			let obj = layout[id]

			let type = obj.type

			let col = obj.col || 0

			let children = null

			// 由最顶级元素到点击元素的id路径
			let path = father_path ? `${father_path}_${id}` : id
			// 如果children存在，并且children的type属性为component,那么直接渲染组件
			if (isPlainObject(obj.children)) {
				if (obj.children.type === 'component') {
					let data = obj.children.customSetting || {}
					switch (obj.children.name) {
						case 'Breadcrumb':
							let temDom = data.map((item, index) => (
								<Breadcrumb.Item key={index}>
									{item}
								</Breadcrumb.Item>
							))
							children = <Breadcrumb>{temDom}</Breadcrumb>
							break
						case 'Pagination':
							children = (
								<Pagination
									showQuickJumper
									// defaultCurrent={2}
									total={data}
								/>
							)
							break
						case 'Steps':
							children = (
								<Steps current={data.current}>
									{data.steps.map((item, index) => (
										<Step
											key={index}
											title={item.title}
											description={item.description}
										/>
									))}
								</Steps>
							)
							break
						case 'Button':
							children = <Button type="primary">Primary</Button>
							break
						case 'Dropdown':
							const menu = (
								<Menu>
									<Menu.Item>
										<a>1st menu item</a>
									</Menu.Item>
									<Menu.Item>
										<a>2nd menu item</a>
									</Menu.Item>
									<Menu.Item>
										<a>3rd menu item</a>
									</Menu.Item>
								</Menu>
							)
							children = (
								<Dropdown overlay={menu} placement="bottomLeft">
									<Button>bottomLeft</Button>
								</Dropdown>
							)
							break
						case 'Cascader':
							const options = [
								{
									value: 'zhejiang',
									label: 'Zhejiang',
									children: [
										{
											value: 'hangzhou',
											label: 'Hangzhou',
											children: [
												{
													value: 'xihu',
													label: 'West Lake',
												},
											],
										},
									],
								},
								{
									value: 'jiangsu',
									label: 'Jiangsu',
									children: [
										{
											value: 'nanjing',
											label: 'Nanjing',
											children: [
												{
													value: 'zhonghuamen',
													label: 'Zhong Hua Men',
												},
											],
										},
									],
								},
							]
							children = (
								<Cascader
									options={options}
									placeholder="Please select"
								/>
							)
							break
						case 'Checkbox':
							children = <Checkbox>Checkbox</Checkbox>
							break
						case 'DatePicker':
							children = <DatePicker />
							break
						case 'MonthPicker':
							children = <MonthPicker />
							break
						case 'RangePicker':
							children = <RangePicker />
							break

						// 以下是自定义组件
						case 'SearchBar':
							children = <SearchBar id={obj.children.id} />
							break
						case 'CustomTable':
							children = <CustomTable id={obj.children.id} />
							break
						case 'CustomForm':
							children = <CustomForm id={obj.children.id} />
							break
						case 'CustomCarousel':
							children = <CustomCarousel id={obj.children.id} />
							break
						case 'CustomPagination':
							children = <CustomPagination id={obj.children.id} />
							break
						case 'CustomSteps':
							children = <CustomSteps id={obj.children.id} />
						case 'CustomBreadcrumb':
							children = <CustomBreadcrumb id={obj.children.id} />
							break
						default:
					}
				} else {
					children = t.transLayoutToDom(obj.children, path)
				}
			}

			let dom = null

			let className = `custom-${type} ${
				currentLayout.currentEditId === id ? 'is_active' : ''
			}`

			switch (type) {
				case 'row':
					dom = (
						<Row
							onDoubleClick={this.showDeleteModal.bind(
								this,
								id,
								path,
							)}
							onClick={this.markCurrentEdit.bind(
								this,
								id,
								path,
								currentRoute,
							)}
							className={className}
							key={index}
						>
							{children}
						</Row>
					)
					break
				case 'col':
					dom = (
						<Col
							onDoubleClick={this.showDeleteModal.bind(
								this,
								id,
								path,
							)}
							onClick={this.markCurrentEdit.bind(
								this,
								id,
								path,
								currentRoute,
							)}
							className={className}
							span={col}
							key={index}
						>
							{children}
						</Col>
					)
					break
				default:
					dom = (
						<Row
							onDoubleClick={this.showDeleteModal.bind(
								this,
								id,
								path,
							)}
							onClick={this.markCurrentEdit.bind(
								this,
								id,
								path,
								currentRoute,
							)}
							className={className}
							key={index}
						>
							{children}
						</Row>
					)
					break
			}

			return dom
		})
	}

	render() {
		const { currentEditId, state, currentRoute } = this.props
		return (
			<div
				onClick={() => {
					this.props.markCurrentEdit({
						id: null,
						father_id: null,
						currentRoute,
					})
				}}
				className="content-wrap"
			>
				<div
					className={
						state.preview ? 'fe-is-preview' : 'fe-not-preview'
					}
				>
					{this.transLayoutToDom(state[currentRoute].layout)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentEditId: state.currentEditId,
	currentRoute: state.currentRoute,
	state,
})

const mapMutationsToProps = ['markCurrentEdit']

const mapActionsToProps = ['deleteComponent']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Content,
)

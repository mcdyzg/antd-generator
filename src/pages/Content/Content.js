import React, { Component } from 'react'
import './Content.scss'
import { Button, Row, Col, Modal } from 'antd'
import { connect } from 'ruex'
import SearchBar from '@comp/SearchBar'
import BasicTable from '@comp/BasicTable'
import BasicForm from '@comp/BasicForm'
import Carousel from '@comp/Carousel'
const confirm = Modal.confirm
import { isPlainObject } from '@utils'

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
					switch (obj.children.name) {
						case 'SearchBar':
							children = <SearchBar />
							break
						case 'BasicTable':
							children = <BasicTable id={obj.children.id} />
							break
						case 'BasicForm':
							children = <BasicForm />
							break
						case 'Carousel':
							children = <Carousel />
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
		const { layout, currentEditId, state, currentRoute } = this.props
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
				{this.transLayoutToDom(state[currentRoute].layout)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	layout: state.layout,
	currentEditId: state.currentEditId,
	currentRoute: state.currentRoute,
	state,
})

const mapMutationsToProps = ['markCurrentEdit']

const mapActionsToProps = ['deleteComponent']

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Content,
)

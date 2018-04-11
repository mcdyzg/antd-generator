import { createStore } from 'ruex'
import uuid from 'uuid/v1'
import SearchBar from '@comp/SearchBar/store'
import CustomTable from '@comp/CustomTable/store'
import CustomForm from '@comp/CustomForm/store'
import CustomCarousel from '@comp/CustomCarousel/store'
import CustomBreadcrumb from '@comp/CustomBreadcrumb/store'
import CustomPagination from '@comp/CustomPagination/store'
import CustomSteps from '@comp/CustomSteps/store'

import SiderMenu from '@modules/SiderMenu/store'
import Header from '@modules/Header/store'

// console.log(localStorage.page_layout)
const state = {
	// // 当前正在编辑的block id
	// currentEditId: null,
	// currentEditPath: null,
	// 当前所在路由
	currentRoute: '/',

	// 预览状态
	preview: false,
}

const mutations = {
	// 将当前块标记成正在编辑中
	markCurrentEdit(state, payload) {
		const { id, path, currentRoute } = payload
		state[currentRoute].currentEditId = id
		state[currentRoute].currentEditPath = payload.path
	},
	// 添加布局
	addToLayoutMuta(state, payload) {
		let addDom = {}
		let _arr = payload.split(' ')
		_arr.forEach(item => {
			const uid = uuid()
			addDom[uid] = {
				type: 'col',
				id: uid,
				col: +item,
			}
		})

		const uid = uuid()
		let currentComponent = state[state.currentRoute]
		if (currentComponent.currentEditId === null) {
			currentComponent.layout[uid] = {
				type: 'row',
				id: uid,
				children: addDom,
			}
		} else {
			let contextArr = currentComponent.currentEditPath.split('_')
			let currentDom = { children: currentComponent.layout }
			contextArr.map(item => {
				currentDom = currentDom.children[item]
			})
			currentDom.children = addDom
		}
	},
	// 将组件添加到布局里
	addComponentToLayoutMuta(state, payload) {
		let addComponent = payload
		addComponent.id = payload.id

		const uid = uuid()
		let currentComponent = state[state.currentRoute]
		if (currentComponent.currentEditId === null) {
			currentComponent.layout[uid] = {
				type: 'row',
				id: uid,
				children: addComponent,
			}
		} else {
			let contextArr = currentComponent.currentEditPath.split('_')
			let currentDom = { children: currentComponent.layout }
			contextArr.map(item => {
				currentDom = currentDom.children[item]
			})
			currentDom.children = addComponent
		}
	},
	// 删除组件
	deleteComponentMuta(state, payload) {
		// let currentComponent = state[state.currentRoute]
		// if (currentComponent.currentEditId !== null) {
		// 	let contextArr = currentComponent.currentEditPath.split('_')
		// 	let currentDom = { children: currentComponent.layout }
		// 	contextArr.map(item => {
		// 		currentDom = currentDom.children[item]
		// 	})
		// 	currentDom.children = {}
		// }

		const { id, path } = payload
		let currentComponent = state[state.currentRoute]
		let contextArr = path.split('_')
		let currentDom = { children: currentComponent.layout }
		contextArr.map(item => {
			currentDom = currentDom.children[item]
		})
		currentDom.children = {}
	},
	// 从url中获取当前的路由，然后使当前路由在layout对象里初始化
	setCurrentRoute(state, payload) {
		state.currentRoute = payload
		const layout = state[payload] ? state[payload].layout || {} : {}
		state[payload] = {
			path: payload,
			layout,
			currentEditId: null,
			currentEditPath: null,
		}
	},
	// 更改预览状态
	togglePreview(state, payload) {
		state.preview = !state.preview
	},
}

const actions = {
	// 将新网格添加到布局里
	addToLayout({ state, commit, rootState, dispatch }, payload) {
		commit('addToLayoutMuta', payload)
	},
	// 将组件添加到布局里
	addComponentToLayout({ state, commit, rootState, dispatch }, payload) {
		let componentId = uuid()
		payload.id = componentId

		// 给组件生成一个组件store并添加
		let compStore = {}
		switch (payload.name) {
			case 'CustomTable':
				compStore = Object.assign({}, CustomTable)
				break
			case 'SearchBar':
				compStore = Object.assign({}, SearchBar)
				break
			case 'CustomForm':
				compStore = Object.assign({}, CustomForm)
				break
			case 'CustomCarousel':
				compStore = Object.assign({}, CustomCarousel)
				break
			case 'CustomBreadcrumb':
				compStore = Object.assign({}, CustomBreadcrumb)
				break
			case 'CustomPagination':
				compStore = Object.assign({}, CustomPagination)
				break
			case 'CustomSteps':
				compStore = Object.assign({}, CustomSteps)
				break
			default:
		}

		// 如果component不需要store，那么不需要注册新的store
		if (!payload.noNeedStore) {
			store.registerModule(payload.id, compStore)
			// store.unregisterMudole(payload.id)
		}

		// 添加组件的时候，如果当前要添加的位置已经有component了，那么需要先删掉当前位置的组件，然后在下一个宏任务中将组件添加上，这样做是为了新组建能重新执行construtor和componentDidMount
		let currentComponent = state[state.currentRoute]
		if (currentComponent.currentEditId === null) {
			commit('addComponentToLayoutMuta', payload)
		} else {
			let contextArr = currentComponent.currentEditPath.split('_')
			let currentDom = { children: currentComponent.layout }
			contextArr.map(item => {
				currentDom = currentDom.children[item]
			})

			// 如果当前选中的是模块children是组件，那么需要先删除组件，然后下一个宏任务里添加组件，如果不是组件而是layout，那么直接添加到layout里
			if (
				currentDom.children &&
				currentDom.children.type === 'component'
			) {
				commit('deleteComponentMuta', {
					id: currentComponent.currentEditId,
					path: currentComponent.currentEditPath,
				})
				setTimeout(() => {
					store.unregisterMudole(currentDom.children.id)
					commit('addComponentToLayoutMuta', payload)
				})
			} else {
				commit('addComponentToLayoutMuta', payload)
			}
		}
	},
	// 删除布局或组件
	deleteComponent({ state, commit, rootState, dispatch }, payload) {
		commit('deleteComponentMuta', payload)
	},
}

// middleware
const logger = store => next => (mutation, payload) => {
	console.group('触发mutation前', store.getState())
	console.log(mutation)
	let result = next(mutation, payload)
	console.log('触发mutation后', store.getState())
	console.groupEnd()
	// return result
}

const store = createStore(
	{
		state,
		mutations,
		actions,
		modules: {
			SearchBar,
			CustomTable,
			CustomForm,
			SiderMenu,
			CustomCarousel,
			Header,
		},
	},
	[logger],
)

export default store

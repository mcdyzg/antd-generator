import Mock from 'mockjs'
const state = {
	list: [],
	// 正在读取数据中
	loading: false,
	pageNum: 1,
	pageSize: 15,
	total: 0,
}

const mutations = {
	// 更改某一参数
	changeBTArg(state, payload) {
		state = Object.assign(state, payload)
	},
	// 获取试卷列表
	getBasicTableList(state, payload) {
		state.list = payload.list
		state.total = payload.total
	},
	// 更改loading状态
	changeBTLoading(state, payload) {
		state.loading = payload
	},
}

const actions = {
	// 获取试卷列表
	requestBasicTable({ state, commit, rootState, dispatch }, payload) {
		commit('changeBTLoading', true)

		// 获取试卷列表
		let query = {
			pageNum: state.pageNum,
			pageSize: state.pageSize,
		}

		let data = Mock.mock({
			'list|15': [
				{
					'name|+1': ['名称一', '名称二'],
					'total|+2': 100,
					'create_time|+86400': 1523025161371,
					'_id|+1': 1,
				},
			],
			total: 200,
		})
		setTimeout(() => {
			commit('getBasicTableList', data)

			commit('changeBTLoading', false)
		}, 200)
	},
	// 切换分页
	searchBasicTable({ state, commit, rootState, dispatch }, payload) {
		commit('changeBTArg', payload)
		dispatch('requestBasicTable')
	},
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}

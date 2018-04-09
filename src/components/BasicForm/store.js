import Mock from 'mockjs'
// 试题列表的搜索框的状态
const state = {
	// 题型列表
	list: [],
	// 正在读取数据中
	loading: false,
}

const mutations = {
	// 获取题型列表
	getBasicFormList(state, payload) {
		state.list = payload
	},
	// 更改loading状态
	changeBFLoading(state, payload) {
		state.loading = payload
	},
}

const actions = {
	// 获取题型列表
	requestBasicFormList({ state, commit, rootState, dispatch }, payload) {
		commit('changeBFLoading', true)
		var data = Mock.mock({
			'list|1-3': [
				{
					'name|+1': ['下拉一', '下拉二', '下拉三'],
					'cn_name|+1': ['下拉一', '下拉二', '下拉三'],
				},
			],
		})
		setTimeout(() => {
			commit('getBasicFormList', data.list)

			commit('changeBFLoading', false)
		}, 200)
	},
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}

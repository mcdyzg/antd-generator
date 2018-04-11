// 试题列表的搜索框的状态
const state = {
	// 题型列表
	routes: [
		{
			path: '/',
			name: '首页',
		},
		{
			path: '/second',
			name: '第二个页面',
			routes: [
				{
					path: '/child1',
					name: '子页面一',
				},
				{
					path: '/child2',
					name: '子页面二',
				},
			],
		},
	],
	open: true,
	title: 'antd-generator',
}

const mutations = {
	toggleSiderMenuOpen(state, payload) {
		state.open = !state.open
	},
	updateSiderMenuTitle(state, payload) {
		state.title = payload
	},
}

const actions = {}

export default {
	actions,
	mutations,
	state,
}

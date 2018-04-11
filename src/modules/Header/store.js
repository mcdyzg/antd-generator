import Mock from 'mockjs'
const state = {
	open: true,
}

const mutations = {
	toggleHeaderOpen(state, payload) {
		state.open = !state.open
	},
}

const actions = {}

export default {
	actions,
	mutations,
	state,
}

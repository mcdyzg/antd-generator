import React from 'react'
import { Modal, Input, Switch, Divider } from 'antd'
import './Header.scss'
import { connect } from 'ruex'

class Header extends React.Component {
	state = {
		visible: false,
	}

	render() {
		const { visible } = this.state
		const { open } = this.props.Header
		return (
			<div className="">
				<div onClick={() => this.setState({ visible: true })}>
					Header
				</div>
				{/* <Modal
					title="Header"
					visible={visible}
					onOk={this.updateHeaderTitle}
					onCancel={() => this.setState({ visible: false })}
				>
					<Switch
						onChange={this.props.toggleHeaderOpen}
						checkedChildren="开"
						unCheckedChildren="关"
						checked={open}
					/>
					<Divider />
					<Input
						value={HeaderTitle}
						onChange={e =>
							this.setState({ HeaderTitle: e.target.value })
						}
						placeholder="输入栅格"
					/>
				</Modal> */}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	Header: state.Header,
})

const mapMutationsToProps = ['toggleHeaderOpen']

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Header,
)

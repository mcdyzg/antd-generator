import { Steps } from 'antd'
import './CustomSteps.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'
const Step = Steps.Step

class CustomSteps extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		return (
			<div className="steps-wrap">
				<Steps current={1}>
					<Step
						title="Finished"
						description="This is a description."
					/>
					<Step
						title="In Progress"
						description="This is a description."
					/>
					<Step
						title="Waiting"
						description="This is a description."
					/>
				</Steps>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	CustomSteps: state.CustomSteps,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomSteps,
)

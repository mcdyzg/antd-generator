import React from 'react'
import { connect } from 'ruex'

class Preview extends React.Component {
	state = {}

	render() {
		const { preview } = this.props
		return (
			<div
				style={{
					transform: preview
						? 'translate(-30px, 0)'
						: 'translate(0, 0)',
				}}
			>
				<div onClick={this.props.togglePreview}>预览</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	preview: state.preview,
})

const mapMutationsToProps = ['togglePreview']

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Preview,
)

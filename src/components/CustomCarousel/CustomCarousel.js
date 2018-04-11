import { Button, Table, Spin, Carousel } from 'antd'
import './CustomCarousel.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'

class CustomCarousel extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		const {} = this.props.CustomCarousel
		return (
			<div className="carousel-wrap">
				<Carousel afterChange={this.change}>
					<div>
						<h3>1</h3>
					</div>
					<div>
						<h3>2</h3>
					</div>
					<div>
						<h3>3</h3>
					</div>
					<div>
						<h3>4</h3>
					</div>
				</Carousel>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	CustomCarousel: state.CustomCarousel,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CustomCarousel,
)

import { Button, Table, Spin, Carousel } from 'antd'
import './Carousel.scss'
import React, { PureComponent } from 'react'
import { connect } from 'ruex'

class CarouselC extends PureComponent {
	state = {}
	constructor(props) {
		super(props)
	}

	change = () => {}

	render() {
		const {} = this.props.Carousel
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
	Carousel: state.Carousel,
})

const mapMutationsToProps = []

const mapActionsToProps = []

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	CarouselC,
)

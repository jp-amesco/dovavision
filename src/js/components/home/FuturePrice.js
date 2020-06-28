import { connect } from 'react-redux';
import React, { Component } from 'react';

class FuturePrice extends Component {
	render () {
		return <div className='panel panel-future'>
			<p className={`price-future prevision--${this.props.move ? 'high' : 'low'}`}>
				{this.props.futurePrice !== 0 ? this.props.futurePrice.toFixed(2).toString().replace('.', ',') : ''}
			</p>
		</div>
	}
}

const mapStateToProps = state => ({
  futurePrice: state.stock.futurePrice,
  move: state.stock.move
});

export default connect(mapStateToProps)(FuturePrice);
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Move extends Component {
	render () {
		return <div className='panel panel-future'>
			<p className={`prevision prevision--${this.props.move ? 'high' : 'low'}`}>
				{this.props.move !== '' ? (this.props.move !== 0 ? 'Previsão de alta' : 'Previsão de queda') : ''}
			</p>
		</div>
	}
}

const mapStateToProps = state => ({
  move: state.stock.move
});

export default connect(mapStateToProps)(Move);
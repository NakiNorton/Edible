import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import PlantCard from '../PlantCard/PlantCard'
import { fetchPlants } from '../../apiCalls'
import { connect } from 'react-redux'
import { setPlants } from '../../actions';
import { bindActionCreators } from 'redux';
import './Plants.scss';


class Plants extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    } 
  }

  async componentDidMount() {
    const { setPlants } = this.props;
    let plants = await fetchPlants()
    console.log('1', plants)
    setPlants(plants)
  }

  render() {
    return (
      <section className='Plants'>
        <h2>HELLO</h2>
      </section>
    )
  }
}

export const mapStateToProps = ({ plants }) => ({
  plants
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setPlants
  }, dispatch)
)


export default connect(mapStateToProps, mapDispatchToProps) (Plants)
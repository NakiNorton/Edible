import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlantCard from '../PlantCard/PlantCard'
import { fetchEdibleRoots, fetchEdibleFlowers } from '../../apiCalls'
import { connect } from 'react-redux'
import { setEdibleFlowers, setEdibleRoots } from '../../actions';
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
    const { setEdibleRoots, setEdibleFlowers } = this.props;
    let roots = await fetchEdibleRoots()
    let flowers = await fetchEdibleFlowers()
    setEdibleFlowers(flowers)
    setEdibleRoots(roots)
  }

// filterPlants (input)
// if input matches listName(s) return listname 
// allplants
// roots
// flowers


  render() {
    const { roots, flowers } = this.props;
    const plants = roots.concat(flowers)
    console.log('combined lists', plants)
    
    const plantInfo = plants.map(plant => {
     return <PlantCard 
        key={plant.id}
        id={plant.id}
        plantName={plant.common_name}
        image={plant.image_url}
        sciName={plant.scientific_name}
      />
    })

    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
        <section className='plant-container'>
          {plantInfo}
        </section>
      </section>
    )
  }
}

export const mapStateToProps = ({ roots, flowers }) => ({
  roots,
  flowers
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setEdibleRoots,
    setEdibleFlowers
  }, dispatch)
)


export default connect(mapStateToProps, mapDispatchToProps) (Plants)
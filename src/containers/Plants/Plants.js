import React, { Component } from 'react';
import PlantCard from '../PlantCard/PlantCard'
import { connect } from 'react-redux'
import './Plants.scss';
import Facts from '../../components/Facts/Facts'

class Plants extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      searchValue: '',
      searchResults: [],
      filterInput: '',
      filteredResults: [],
    } 
  }

  handleSearchInputChange = (e) => {
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  searchPlants = (e) => {
    e.preventDefault()
    const { searchValue } = this.state;
    const { plants } = this.props;
    const upperCaseInput = searchValue.toUpperCase()
    const searchResults = plants.filter(plant =>     
      plant.common_name.includes(upperCaseInput) ||
      plant.scientific_name.toUpperCase()
      .includes(upperCaseInput))
    this.setState({ searchResults: searchResults })
    // this.setState({ searchValue: ''}) 
  }

  handleFilterFormSelection = (e) => {
    e.preventDefault()
    this.setState({ filterInput: e.target.value })
  }

  filterPlants= (e) => {
    e.preventDefault()
    const { filterInput } = this.state
    const { plants } = this.props
    if (filterInput) {
    const filteredPlants = plants.filter(plant => plant.list === filterInput)
    this.setState({ searchResults: [] })
    this.setState({ filteredResults: filteredPlants })
    }
  }

  displayPlants = () => {
    const { filteredResults, searchResults } = this.state
    const { plants } = this.props
    let plantList;
    if (searchResults.length > 0) {
      plantList = searchResults
    } else if (filteredResults.length > 0) {
      plantList = filteredResults
    } else {
      plantList = plants;
    }
    const plantsToDisplay = plantList.map((plant, i) => {
      return <PlantCard
        key={i}
        id={plant.id}
        plantName={plant.common_name}
        image={plant.image_url}
        sciName={plant.scientific_name}
        list={plant.list}
        isSaved={plant.plantSaved}
      />
    })
    return plantsToDisplay
  }

  render() {    
    return (
      <section className='Plants'>
        <>
        <Facts />
        </>
        <h1 className='page-heading'>Browse Plants</h1>
        <div className='search-container'>
          <div className='search'>
            <input type='text' 
              className='searchInput' 
              placeholder='Search by plant name...' 
              onChange={this.handleSearchInputChange}
              value={this.state.search}
              />
              <button type='submit' className='searchButton' onClick={this.searchPlants}>Search</button>
              </div>
            <form aria-label='select filter value'>
              <select name='filterDropdown' data-testid='select-one' onChange={this.handleFilterFormSelection}>
                <option value=''>--Filter by--</option>
                <option value={null}>View All</option>
                <option value='seeds' data-testid='seeds'>Seeds</option>  
                <option value='roots'>Roots</option>
                <option value='leaves'>Leaves</option>
                <option value='flowers'>Flowers</option>
                <option value='fruits'>Fruits</option>
              </select>
              <input type='submit' value='Submit' className='filterButton' onClick={this.filterPlants} />
            </form>
           </div>
        <section className='plant-container'>
          {this.displayPlants()}
        </section>
      </section>
    )
  }
}

export const mapStateToProps = ({ plants }) => ({
  plants
})

export default connect(mapStateToProps) (Plants)
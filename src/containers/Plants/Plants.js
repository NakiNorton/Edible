import React, { Component } from 'react';
import PlantCard from '../PlantCard/PlantCard'
import { connect } from 'react-redux'
import './Plants.scss';

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

  searchPlants = (input) => {
    const { plants } = this.props;
    const upperCaseInput = input.toUpperCase()
    const searchResults = plants.filter(plant =>     
      plant.common_name.includes(upperCaseInput) ||
      plant.scientific_name.toUpperCase()
      .includes(upperCaseInput))
    this.setState({ searchResults: searchResults })
  }

  handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.input)
    this.searchPlants(this.state.searchValue)
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ searchValue: e.target.value })
  }

  displayPlants = () => {
    const { filteredResults, searchResults } = this.state
    const { plants } = this.props
    let plantList;
    if(searchResults.length > 0) {
      plantList = searchResults
    } else if(filteredResults.length > 0) {
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

  handleFormSelection = (e) => {
    e.preventDefault()
    this.setState({ filterInput: e.target.value })
  }

  displayFilteredResults = (e) => {
    e.preventDefault()
    const { filterInput } = this.state
    const { plants } = this.props
    if (filterInput) {
    const filteredPlants = plants.filter(plant => plant.list === filterInput)
    this.setState({ searchResults: [] })
    this.setState({ searchValue: '' })
    this.setState({ filteredResults: filteredPlants })
    }
  }

  render() {    
    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
        <section>
          {this.props.plants.length === 0 &&
            <h3 className='no-plants-msg'>Sorry, there was an error fetching the data. </h3>
          }
        </section>
        <div className='search-container'>
          <div className='search'>
            <input type='text' 
              className='searchInput' 
              placeholder='Search by plant name..' 
              onChange={this.handleInputChange}
              value={this.state.search}
              />
              <button type='submit' className='searchButton' onClick={this.handleSearch}>Search
              </button>
            <form aria-label="select filter value">
              <select name='filterDropdown' data-testid='select-one' onChange={this.handleFormSelection}>
                <option value=''>--Filter by...--</option>
                <option value={null}>View All</option>
                <option value='seeds' data-testid='seeds'>Seeds</option>  
                <option value='roots'>Roots</option>
                <option value='leaves'>Leaves</option>
                <option value='flowers'>Flowers</option>
                <option value='fruits'>Fruits</option>
              </select>
              <input type='submit' value='Submit' onClick={this.displayFilteredResults} />
            </form>
           </div>
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
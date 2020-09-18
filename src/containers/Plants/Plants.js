import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlantCard from '../../components/PlantCard/PlantCard'
import { fetchEdiblePlants } from '../../apiCalls'
import { connect } from 'react-redux'
import { setEdiblePlants } from '../../actions';
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

  async componentDidMount() {
    const { setEdiblePlants } = this.props;
    try {
      // how to refactor? Loads really slow
      const leavesData = await fetchEdiblePlants('leaves')
      const rootsData = await fetchEdiblePlants('roots')
      const flowersData = await fetchEdiblePlants('flowers')
      const fruitsData = await fetchEdiblePlants('fruits')
      const seedsData = await fetchEdiblePlants('seeds')
      const newDataSet = leavesData.concat(
        rootsData, 
        flowersData, 
        fruitsData,
        seedsData
        )
      setEdiblePlants(newDataSet)
    }
    catch(error) {
      console.warn(error)
    }
  }

  searchPlants = (input) => {
    const { plants } = this.props;
    const lowerCaseInput = input.toLowerCase()
    const titleCaseInput = input.charAt(0).toUpperCase() + input.slice(1)
    
    const searchResults = plants.filter(plant => 
      plant.common_name.includes(lowerCaseInput || titleCaseInput) ||
      plant.scientific_name.includes(lowerCaseInput || titleCaseInput))
    console.log('results', searchResults)
    this.setState({ searchResults: searchResults })
  }

  handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.input)
    this.searchPlants(this.state.searchValue)
    this.setState({ searchValue: '' })
  }

  handleInputChange = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  displayPlants = () => {
    // need to refactor and clear fields after search/filter
    let dataToDisplay;
    if (this.state.searchResults.length) { 
      dataToDisplay = this.state.searchResults
    } else if (this.state.filteredResults.length) {
      dataToDisplay = this.state.filteredResults
    } else {
      dataToDisplay = this.props.plants
    }
    const plantInfo = dataToDisplay.map((plant, i) => {
      return <PlantCard
        key={i}
        id={plant.id}
        plantName={plant.common_name}
        image={plant.image_url}
        sciName={plant.scientific_name}
        list={plant.list}
      />
    })
    return plantInfo
  }

  // FILTER LOGIC
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
    this.setState({ filteredResults: filteredPlants })
    }
  }

  render() {
    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
        <div className='search-container'>
          <div className='search'>
            <input type='text' 
              className='searchInput' 
              placeholder='Search by plant name..' 
              onChange={this.handleInputChange}
              value={this.state.search}
              />
              <button type='submit' className='searchButton' onClick={this.handleSearch}>
              <i className='search-icon'></i>
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

export const mapDispatchToProps = {
    setEdiblePlants
  }

export default connect(mapStateToProps, mapDispatchToProps) (Plants)
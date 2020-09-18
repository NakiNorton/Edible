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
      filteredResults: [],
    } 
  }

  async componentDidMount() {
    const { setEdiblePlants } = this.props;
    try {
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
    const plantKeys = Object.keys(plants)
    const searchResults = plantKeys.filter(key => 
      plants[key].common_name.includes(lowerCaseInput || titleCaseInput) ||
      plants[key].scientific_name.includes(lowerCaseInput || titleCaseInput))
    // returning keys ///// how do I get the full objects?
    console.log('results', searchResults)
    this.setState({ searchresults: []})
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

  createPlantLists = () => {
    const { plants } = this.props;
    console.log(plants)
    let plantInfo = Object.keys(plants).map((key, i) => {
      console.log(plants[key].list)
      return <PlantCard
        key={i}
        id={plants[key].id}
        plantName={plants[key].common_name}
        image={plants[key].image_url}
        sciName={plants[key].scientific_name}
      />
    })
   
    return plantInfo
  }

  handleFormSelection = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ filteredResults: [e.target.value] })
  }

  displayFilteredResults = (e) => {
    e.preventDefault()
    console.log('hello')
  }

  render() {
    // const { plants } = this.props;
    // let plantInfo = Object.keys(plants).map((key, i) => {
    //   return <PlantCard
    //     key={i}
    //     id={plants[key].id}
    //     plantName={plants[key].common_name}
    //     image={plants[key].image_url}
    //     sciName={plants[key].scientific_name}
    //     />
    // })

    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
        <div className='search-container'>
          <div className='search'>
            <input type='text' 
              className='searchInput' 
              placeholder='What are you looking for?' 
              onChange={this.handleInputChange}
              value={this.state.search}
              />
              <button type='submit' className='searchButton' onClick={this.handleSearch}>
              <i className='search-icon'></i>
              </button>
            <form aria-label="select filter value">
              <select name='filterDropdown' data-testid='select-one' onChange={this.handleFormSelection}>
                <option value=''>--Filter by...--</option>
                <option value='seeds' data-testid='seeds'>Seeds</option>
                <option value='soots'>Roots</option>
                <option value='leaves'>Leaves</option>
                <option value='flowers'>Flowers</option>
                <option value='fruits'>Fruits</option>
              </select>
              <input type='submit' value='Submit' onClick={this.displayFilteredResults} />
            </form>
           </div>
        </div>
        <section className='plant-container'>
        
        {this.createPlantLists()}
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
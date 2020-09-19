
export const cleanData = (plants, list) => {
  let filteredData = plants.filter(plant =>
    !Object.values(plant).includes(null)
  )
  return filteredData.map(plant => {
    let commonName = plant.common_name.toUpperCase()
    let sciName = plant.scientific_name.charAt(0).toUpperCase() + plant.scientific_name.slice(1).toLowerCase()
    return {  
      common_name: commonName,
      scientific_name: sciName,
      id: plant.id + Date.now(),
      image_url: plant.image_url,
      list: list,
      plantSaved: false,
    }
  })
}
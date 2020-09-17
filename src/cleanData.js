export const cleanData = (plants, list) => {
  let filteredData = plants.map(plant => {
   return {  
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      id: plant.id + Date.now(),
      image_url: plant.image_url,
      list: list,
      plantSaved: false,
    }
  })
  return filteredData
}
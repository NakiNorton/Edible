
export const cleanData = (plants, list) => {
  let reducedData = plants.map(plant => {
   return {  
      common_name: plant.common_name || null,
      scientific_name: plant.scientific_name || null,
      id: plant.id + Date.now() || Date.now(),
      image_url: plant.image_url || null,
      list: list,
      plantSaved: false,
    }
  })
  let filteredData = reducedData.filter(plant => 
    !Object.values(plant).includes(null)
  )
  return filteredData;
}
export const cleanData = (plants) => {
  const filteredData = plants.map(plant => {
    return {
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      id: plant.id + Date.now(),
      image_url: plant.image_url
    }
  })
  return filteredData
}
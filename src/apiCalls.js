import { cleanData } from './cleanData'
const key = process.env.REACT_APP_API_KEY;

export async function fetchEdiblePlants(list) {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      "Target-URL": `https://trefle.io/api/v1/plants?token=${key}&filter[edible_part]=${list}`
    }
  })
  const edibleRoots = await checkResponse(response);
  const cleanedData = cleanData(edibleRoots.data, list)
  return cleanedData; 
}

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  } else {
    return response.json();
  }
}


 

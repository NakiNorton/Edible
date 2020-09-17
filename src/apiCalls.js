const key = process.env.REACT_APP_API_KEY;

export async function fetchEdibleRoots() {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      "Target-URL": `https://trefle.io/api/v1/plants?token=${key}&filter[edible_part]=roots`
    }
  })
  const edibleRoots = await checkResponse(response);
  console.log('api', edibleRoots.data)
  return edibleRoots.data;  
}

export async function fetchEdibleFlowers() {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      "Target-URL": `https://trefle.io/api/v1/plants?token=${key}&filter[edible_part]=flowers`
    }
  })
  const edibleFlowers = await checkResponse(response);
  return edibleFlowers.data;
}

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  } else {
    return response.json();
  }
}


 

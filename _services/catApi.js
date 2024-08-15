const BASE_URL = "https://api.thecatapi.com/v1";

const fetchData = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/images/search?${query}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const getRandomCats = async (limit) => {
  const data = await fetchData(`limit=${limit}&has_breeds=1`);

  const detailedDataPromises = data.map((cat) => fetchDetailedData(cat.id));
  const detailedData = await Promise.all(detailedDataPromises);

  return detailedData;
};

const fetchDetailedData = async (id) => {
  const detailResponse = await fetch(`${BASE_URL}/images/${id}`);
  const detailResult = await detailResponse.json();

  return detailResult;
};

export const getCatBreeds = async () => {
  const breedsResponse = await fetch(`${BASE_URL}/breeds`);
  const breedsResult = await breedsResponse.json();

  return breedsResult;
};

export const getCatBreedList = async (limit, breedId) => {
  const breedsListResponse = await fetch(
    `${BASE_URL}/images/search?limit=${limit}&breed_ids=${breedId}`
  );
  const breedsListResult = await breedsListResponse.json();

  return breedsListResult;
};

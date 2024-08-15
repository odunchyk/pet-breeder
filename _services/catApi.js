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

  return detailResponse.json();
};

export const getCatBreeds = async () => {
  const breeds = await fetch(`${BASE_URL}/breeds`);

  return breeds.json();
};

export const getCatBreedList = async (limit, breedId) => {
  const breeds = await fetch(
    `${BASE_URL}/images/search?limit=${limit}&breed_ids=${breedId}`
  );

  return breeds.json();
};

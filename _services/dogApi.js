const BASE_URL = "https://api.thedogapi.com/v1";

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

export const getRandomDogs = async (limit) => {
  const data = await fetchData(`limit=${limit}&has_breeds=1`);

  const detailedDataPromises = data.map((dog) => getDetailedBreed(dog.id));
  const detailedData = await Promise.all(detailedDataPromises);

  return detailedData;
};

export const getDetailedBreed = async (id) => {
  const detailResponse = await fetch(`${BASE_URL}/images/${id}`);

  return detailResponse.json();
};

export const getDogBreeds = async () => {
  const breeds = await fetch(`${BASE_URL}/breeds`);

  return breeds.json();
};

export const getDogBreedList = async (limit, breedId) => {
  const breeds = await fetch(
    `${BASE_URL}/images/search?limit=${limit}&breed_ids=${breedId}`
  );

  return breeds.json();
};

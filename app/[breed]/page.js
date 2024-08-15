import CatDetailed from "@/_components/CatDetailed";
import DogDetailed from "@/_components/DogDetailed";
import { getCatBreeds } from "@/_services/catApi";
import { getDogBreeds } from "@/_services/dogApi";

const dogBreeds = await getDogBreeds();
const catBreeds = await getCatBreeds();
const animalBreeds = [...dogBreeds, ...catBreeds];

export async function generateStaticParams() {
  const params = animalBreeds.map((breed) => ({
    breed: breed.name,
  }));

  return params;
}

function BreedDetailed({ params }) {
  const breedName = decodeURIComponent(params.breed);
  const breed = animalBreeds.filter((breed) => breed.name === breedName);

  if (typeof breed[0].id === "number") {
    return <DogDetailed dog={breed} />;
  }

  return <CatDetailed cat={breed} />;
}

export default BreedDetailed;

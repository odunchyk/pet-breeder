import AnimalsList from "@/_components/AnimalsList";
import { getRandomCats } from "@/_services/catApi";
import { getRandomDogs } from "@/_services/dogApi";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default async function Home() {
  const dogs = await getRandomDogs(5);
  const cats = await getRandomCats(5);
  const animals = shuffle([...dogs, ...cats]);

  return <AnimalsList animals={animals} labeled={true} />;
}

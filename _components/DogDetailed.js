import { Card, Container } from "@mui/material";
import Image from "next/image";
import AnimalsList from "./AnimalsList";
import { getDogBreedList } from "@/_services/dogApi";

async function DogDetailed({ dog }) {
  const {
    name,
    weight,
    height,
    temperament,
    life_span,
    bred_for,
    breed_group,
    id,
    reference_image_id,
  } = dog[0];

  const otherDogsData = await getDogBreedList(10, id);
  const otherDogs = otherDogsData.filter(
    (dog) => dog.id !== reference_image_id
  );

  const basic_info = [
    { label: "Weight", value: `${weight.metric} kg` },
    { label: "Height", value: `${height.metric} cm` },
    { label: "Life span", value: `${life_span} years` },
  ];

  const breed_info = [
    { label: "Breed group", value: `${breed_group}` },
    { label: "Bred for", value: `${bred_for}` },
  ];

  return (
    <Container className="flex flex-col gap-4 mt-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        <ul className="flex flex-col gap-4 list-none p-0 mt-4">
          <li>
            <Image
              src={`https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "300px", margin: "0 auto" }}
            />
          </li>
          <ul className="flex flex-col gap-4">
            {basic_info.map((item) => (
              <li key={item.label}>
                <span className="font-semibold">{`${item.label}: `}</span>
                <span>{`${item.value}`}</span>
              </li>
            ))}
          </ul>
          {breed_info.map((item) => (
            <li>
              <span className="font-semibold">{`${item.label}: `}</span>
              <span>{`${item.value}`}</span>
            </li>
          ))}
          <li>
            <span className="font-semibold">Temperament: </span>
            <span>{temperament}</span>
          </li>
        </ul>
      </Card>
      <AnimalsList animals={otherDogs} labeled={false} />
    </Container>
  );
}

export default DogDetailed;

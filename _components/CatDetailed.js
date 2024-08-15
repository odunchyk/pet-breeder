import React from "react";
import { Card, Container, Grid, Rating } from "@mui/material";
import Image from "next/image";
import { getCatBreedList } from "@/_services/catApi";
import AnimalsList from "./AnimalsList";

const CatDetailed = async ({ cat }) => {
  const {
    name,
    weight,
    temperament,
    origin,
    life_span,
    lap,
    adaptability,
    affection_level,
    child_friendly,
    dog_friendly,
    energy_level,
    health_issues,
    intelligence,
    shedding_level,
    social_needs,
    stranger_friendly,
    vocalisation,
    indoor,
    grooming,
    experimental,
    hairless,
    natural,
    rare,
    rex,
    suppressed_tail,
    short_legs,
    hypoallergenic,
    description,
    alt_names,
    id,
    reference_image_id,
  } = cat[0];

  const otherCatsData = await getCatBreedList(10, id);
  const otherCats = otherCatsData.filter(
    (cat) => cat.id !== reference_image_id
  );

  const ratingItems = [
    { label: "Affection level", value: affection_level },
    { label: "Adaptability", value: adaptability },
    { label: "Child friendly", value: child_friendly },
    { label: "Dog friendly", value: dog_friendly },
    { label: "Energy level", value: energy_level },
    { label: "Grooming", value: grooming },
    { label: "Health issues", value: health_issues },
    { label: "Intelligence", value: intelligence },
    { label: "Shedding level", value: shedding_level },
    { label: "Social needs", value: social_needs },
    { label: "Stranger friendly", value: stranger_friendly },
    { label: "Vocalisation", value: vocalisation },
  ];

  const quirks = [
    { label: "Lap", value: lap },
    { label: "Indoor", value: indoor },
    { label: "Experimental", value: experimental },
    { label: "Hairless", value: hairless },
    { label: "Natural", value: natural },
    { label: "Rare", value: rare },
    { label: "Rex", value: rex },
    { label: "Suppressed tail", value: suppressed_tail },
    { label: "Short legs", value: short_legs },
    { label: "Hypoallergenic", value: hypoallergenic },
  ];

  const basic_info = [
    { label: "Weight", value: `${weight.metric} kg` },
    { label: "Life span", value: `${life_span} years` },
    { label: "Origin", value: `${origin}` },
  ];

  return (
    <Container className="flex flex-col gap-4 mt-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold text-center">{name}</h2>
        {alt_names && (
          <h3 className="text-center font-semibold">{`(${alt_names})`}</h3>
        )}
        <ul className="flex flex-col gap-4 list-none p-0 mt-4">
          <li>
            <Image
              src={`https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "300px", margin: "0 auto" }}
            />
          </li>
          <ul className="flex flex-wrap justify-center gap-4">
            {basic_info.map((item) => (
              <li>
                <span className="font-semibold">{`${item.label}: `}</span>
                <span>{`${item.value}`}</span>
              </li>
            ))}
          </ul>
          <Grid container spacing={2}>
            {ratingItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.label}:</span>
                  <Rating value={item.value} readOnly />
                </div>
              </Grid>
            ))}
          </Grid>
          {quirks.some((q) => q.value === 1) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">Quirks: </span>
              {quirks.map((quirk, index) =>
                quirk.value ? (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg shadow-md"
                  >
                    {quirk.label}
                  </div>
                ) : null
              )}
            </div>
          )}
          <li>
            <span className="font-semibold">Temperament: </span>
            <span>{temperament}</span>
          </li>
          <li>{description}</li>
        </ul>
      </Card>
      <AnimalsList animals={otherCats} labeled={false} />
    </Container>
  );
};

export default CatDetailed;

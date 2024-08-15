import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import Link from "next/link";

function AnimalsList({ animals, labeled }) {
  if (!labeled) {
    return (
      <Masonry columns={3} spacing={3}>
        {animals.map((animal, index) => (
          <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="200"
              image={animal.url}
              alt={`Animal ${index + 1}`}
            />
          </Card>
        ))}
      </Masonry>
    );
  }

  return (
    <Masonry columns={3} spacing={3}>
      {animals.map((animal, index) => (
        <Link href={`/${animal.breeds[0].name}`}>
          <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="200"
              image={animal.url}
              alt={`Animal ${index + 1}`}
            />
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                {animal.breeds[0].name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Masonry>
  );
}

export default AnimalsList;

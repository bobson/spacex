import { useEffect, useState } from "react";

import Link from "next/link";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import MissionCard from "../components/MissionCard";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import { DataMissions, GetMissions } from "../types";

const Home: NextPage<{ missions: DataMissions["launchesPast"] }> = ({
  missions,
}) => {
  const [rocket, setRocket] = useState("");
  const [missionsToShow, setMissionsToShow] = useState(
    rocket ? missions : missions.slice(0, 10)
  );

  const handleChange = (event: SelectChangeEvent) => {
    setRocket(event.target.value as string);
  };

  useEffect(() => {
    setMissionsToShow(
      rocket
        ? missions.filter((mission) => mission.rocket.rocket.id === rocket)
        : missions.slice(0, 10)
    );
  }, [rocket, missions]);

  return (
    <Container maxWidth="xl">
      <Typography mb={4} mt={6} textAlign="center" variant="h2" component="div">
        Missions
      </Typography>
      <Box sx={{ minWidth: 120, width: 180, m: "auto", mb: 5 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ top: "-18%" }} id="filter by rocket">
            Filter By Rocket
          </InputLabel>
          <Select
            labelId="filter by rocket"
            id="filter by rocket"
            value={rocket}
            label="Filter By Rocket"
            onChange={handleChange}
            sx={{ height: 40 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="falcon1">Falcon 1</MenuItem>
            <MenuItem value="falcon9">Falcon 9</MenuItem>
            <MenuItem value="falconheavy">Falcon Heavy</MenuItem>
            <MenuItem value="starship">Starship</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={4} mb={4}>
        {missionsToShow.length ? (
          missionsToShow.map((mission) => (
            <Grid item xs={12} lg={4} xl={3} key={mission.mission_name}>
              <MissionCard mission={mission} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "30px auto",
              padding: "0 40px",
            }}
          >
            <Typography variant="h4" textAlign="center" pb={5} component="div">
              No Missions Found
            </Typography>
            <Typography variant="h4" textAlign="center" component="div">
              Go to{" "}
              <Link href={`/${rocket}`} passHref>
                Rocket Page
              </Link>{" "}
              to see the Rocket details
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data }: GetMissions = await client.query({
    query: gql`
      query GetMissions {
        launchesPast {
          mission_name
          launch_date_local
          links {
            flickr_images
          }
          rocket {
            rocket_name
            rocket {
              id
            }
          }
        }
      }
    `,
  });

  return {
    props: { missions: data.launchesPast },
  };
};

export default Home;

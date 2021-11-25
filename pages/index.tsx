import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "next/link";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import MissionCard from "../components/MissionCard";
import Typography from "@mui/material/Typography";
import { GetStaticProps, NextPage } from "next";
import {  DataMissions, GetMissions } from "../types";

 const Home: NextPage<{missions: DataMissions["launchesPast"]}> = ({ missions }) =>  {
  return (
    <Container maxWidth="xl">
      <Typography m={6} textAlign="center" variant="h2" component="div">
        Missions
      </Typography>
      <Grid container spacing={4} mb={4}>
        {missions.map((mission) => (
          <Grid item xs={12} lg={4} xl={3} key={mission.mission_name}>
            <MissionCard mission={mission} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data }: GetMissions = await client.query({
    query: gql`
      query GetMissions {
        launchesPast(limit: 10) {
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


import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { GetStaticPaths, NextPage } from "next";
import {  GetRockets } from "../types";

const Rocket: NextPage = ({ rocket }: any) => {
  const {
    id,
    name,
    height,
    mass,
    wikipedia,
    engines,
    description,
    first_flight,
  } = rocket;

  const rows = [
    { label: "Engine Type", value: engines.type },
    { label: "First Flight", value: first_flight },
    { label: "Height", value: `${height.meters} m` },
    { label: "Mass", value: `${mass.kg} kg` },
    {
      label: "Wikipedia",
      value: (
        <a href={wikipedia} target="_blank" rel="noreferrer">
          Go To Link
        </a>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <Typography
        variant="h2"
        component="div"
        gutterBottom
        sx={{ color: "#1976D2", textAlign: "center" }}
      >
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom
        sx={{ textAlign: "center" }}
        mb={6}
      >
        <i>{description}</i>
      </Typography>

      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={3}>
          <Image src={`/${id}.png`} alt="rocket" width="100" height="500" />
        </Grid>
        <Grid item xs={9}>
          <Table>
            <TableBody>
              {rows.map(({ label, value }, i) => (
                <TableRow key={i} hover>
                  <TableCell component="th" scope="row">
                    {label}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "900" }} align="right">
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rocket;

export const getStaticProps = async ({ params }: {params: {rocket: string}}) => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } :GetRockets = await client.query({
    query: gql`
      query GetRockets {
        rockets {
          first_flight
          height {
            meters
          }
          mass {
            kg
          }
          wikipedia
          engines {
            type
          }
          name
          description
          id
        }
      }
    `,
  });

  const rocket = data.rockets.find((rocket) => rocket.id === params.rocket);

  return {
    props: { rocket },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } : GetRockets = await client.query({
    query: gql`
      query GetRocketsNames {
        rockets {
          id
        }
      }
    `,
  });

  const paths = data.rockets
    .map((rocket) => rocket.id)
    .map((id) => ({ params: { rocket: id } }));

  return {
    paths,
    fallback: false,
  };
};

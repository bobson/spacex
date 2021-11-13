import Image from "next/image";
import styles from "../styles/Rocket.module.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import "antd/dist/antd.css";

import { Card, Typography, Row, Col } from "antd";

const { Meta } = Card;
const { Title, Text } = Typography;

const Rocket = ({ rocket }) => {
  // const { engines } = rocket;
  console.log(rocket.description);
  return (
    <Col className={styles.rocketDetailContainer}>
      <Col className={styles.rocketHeading}>
        <Title className={styles.rocketName}>{rocket.name}</Title>
        <p>Rocket {rocket.name} Overwiev</p>
        <p>{rocket.description}</p>
      </Col>

      <Col className={styles.rocketStatsContainer}>
        {/* <Col className={styles.rocketValueStats}> */}
        <Col className={styles.rocketStats}>
          <Col className={styles.rocketStatsName}>
            <Text>Engine type</Text>
          </Col>
          <Text className={styles.stats}>{rocket.engines.type}</Text>
        </Col>
        <Col className={styles.rocketStats}>
          <Col className={styles.rocketStatsName}>
            <Text>Engine layout</Text>
          </Col>
          <Text className={styles.stats}>{rocket.engines.layout}</Text>
        </Col>
        <Col className={styles.rocketStats}>
          <Col className={styles.rocketStatsName}>
            <Text>Rocket height</Text>
          </Col>
          <Text className={styles.stats}>{rocket.height.meters} m</Text>
        </Col>
        {/* </Col> */}
      </Col>
      <Image src={`/assets/${rocket.id}.jpg`} width="100%" height="100%" />
    </Col>
  );
};

export async function getStaticProps({ params }) {
  const rocketName = params.rocket;

  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        rockets {
          name
          engines {
            type
            layout
            version
            number
          }
          height {
            meters
          }
          wikipedia
          id
          description
        }
      }
    `,
  });

  const launch = data.rockets.find((rocket) => rocket.id === rocketName);

  return {
    props: {
      rocket: launch,
    },
  };
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        rockets {
          id
        }
      }
    `,
  });

  const ids = data.rockets.map((rocket) => rocket.id);

  const pathsParams = ids.map((id) => ({ params: { rocket: id } }));

  return {
    paths: pathsParams,
    fallback: true,
  };
}

export default Rocket;

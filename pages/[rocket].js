import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Rocket.module.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import "antd/dist/antd.css";

import { Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const Rocket = ({ rocket }) => {
  return (
    <Col className={styles.rocketDetailContainer}>
      <Col className={styles.rocketHeading}>
        <Title className={styles.rocketName}>{rocket.name}</Title>
        <p>{rocket.description}</p>
      </Col>
      <Row style={{ marginTop: "30px" }}>
        <Col xs={6}>
          <Image
            src={`/assets/${rocket.id}.png`}
            width="100px"
            height="500px"
            alt="rocket"
          />
        </Col>
        <Col xs={18} className={styles.rocketStatsContainer}>
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>Engine type</Text>
            </Col>
            <Text className={styles.stats}>{rocket.engines.type}</Text>
          </Col>
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>First Flight</Text>
            </Col>
            <Text className={styles.stats}>{rocket.first_flight}</Text>
          </Col>
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>Rocket height</Text>
            </Col>
            <Text className={styles.stats}>{rocket.height.meters} m</Text>
          </Col>
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>Rocket mass</Text>
            </Col>
            <Text className={styles.stats}>{rocket.mass.kg} kg</Text>
          </Col>
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>Wikipedia</Text>
            </Col>
            <Text className={styles.stats}>
              <a
                target="_blank"
                href={rocket.wikipedia}
                rel="noopener noreferrer"
              >
                Go to Link
              </a>
            </Text>
          </Col>
        </Col>
      </Row>
    </Col>
  );
};

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        rockets {
          engines {
            type
          }
          first_flight
          name
          id
          mass {
            kg
          }
          wikipedia
          height {
            meters
          }
          description
        }
      }
    `,
  });

  const launch = data.rockets.find((rocket) => rocket.id === params.rocket);

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
    fallback: false,
  };
}

export default Rocket;

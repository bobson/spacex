import Image from "next/image";
import styles from "../styles/Rocket.module.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import "antd/dist/antd.css";

import { Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

const Rocket = ({ rocket }) => {
  return (
    // <Row gutter={8}>
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
          <Col className={styles.rocketStats}>
            <Col className={styles.rocketStatsName}>
              <Text>Rocket mass</Text>
            </Col>
            <Text className={styles.stats}>{rocket.mass.kg} kg</Text>
          </Col>
        </Col>
      </Row>
    </Col>
    // </Row>
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
          mass {
            kg
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

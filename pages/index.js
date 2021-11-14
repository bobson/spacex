import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Typography, Row, Button, Select } from "antd";
import UpCircleOutlined from "@ant-design/icons";

import Card from "../components/Card";

const { Title } = Typography;
const { Option } = Select;

export default function Home({ launches }) {
  const [rocket, setRocket] = useState(undefined);
  const [count, setCout] = useState(true);

  let launchesToShow = count ? launches.slice(0, 10) : launches;

  if (rocket) {
    launchesToShow = launches.filter(
      (launch) => launch.rocket.rocket.id === rocket
    );
  }

  return (
    <>
      <div className={styles.homeHeading}>
        <Title className={styles.title}>SpaseX Missions</Title>
      </div>
      <div className={styles.options}>
        <Title level={5}>Filter launches by Rocket</Title>
        <Select
          onChange={(e) => {
            setRocket(e);
            setCout(false);
          }}
          value={rocket}
          style={{ width: 130 }}
          allowClear
        >
          <Option value=""></Option>
          <Option value="falcon1">Falcon 1</Option>
          <Option value="falcon9">Falcon 9</Option>
          <Option value="falconheavy">Falcon Heavy</Option>
          <Option value="starship">Starship</Option>
        </Select>
      </div>

      {launchesToShow.length ? (
        <>
          {!rocket && (
            <div className={styles.latest}>
              <Title level={5} className={styles.latest}>
                {count && "Last 10 missions"}
              </Title>
              <Button
                type="link"
                onClick={() => setCout(!count)}
                className={styles.showMore}
              >
                {count ? "Show All" : "Show Last 10"}
              </Button>
            </div>
          )}
          <Row gutter={[32, 32]} className={styles.cardContainer}>
            {launchesToShow.map((launch) => {
              const img = launch.links.flickr_images[0] || "/assets/card.jpg";

              return (
                <Card key={launch.mission_name} launch={launch} img={img} />
              );
            })}
            <UpCircleOutlined />
          </Row>
        </>
      ) : (
        <Title className={styles.noRecords}>No records found</Title>
      )}
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast {
          mission_name
          launch_date_local
          links {
            video_link
            flickr_images
          }
          rocket {
            rocket {
              id
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}

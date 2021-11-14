import Link from "next/link";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Typography, Row, Button, Select } from "antd";

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
      <div
        style={{
          background:
            "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/145a4477029515.5c7bcf54cc7f2.png')",
        }}
        className={styles.hero}
      />
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <div className={styles.title}>
          <Title>Missions</Title>
          <div className={styles.options}>
            <h4>Filter by Rocket</h4>
            <Select
              showSearch
              onChange={(e) => {
                setRocket(e);
                setCout(false);
              }}
              placeholder="Select a rocket"
              value={rocket}
              style={{ width: 200 }}
              allowClear
            >
              <Option value="falcon1">Falcon 1</Option>
              <Option value="falcon9">Falcon 9</Option>
              <Option value="falconheavy">Falcon Heavy</Option>
              <Option value="starship">Starship</Option>
            </Select>
          </div>
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
            </Row>
          </>
        ) : (
          <>
            <Title className={styles.noRecords}>No records found</Title>
            <Title className={styles.noRecords}>
              Go to <Link href={`/${rocket}`}>Rocket Page </Link>to see the
              Rocket details
            </Title>
          </>
        )}
      </div>
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

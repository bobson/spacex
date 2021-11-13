import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import "antd/dist/antd.css";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Link from "next/link";
import { getData } from "../apollo/functions";

import { Card, Typography, Row, Col } from "antd";

const { Meta } = Card;
const { Title } = Typography;

export default function Home({ launches }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Lanches</title>
        <meta name="description" content="SpaceX Lanches Pabau" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>SpaceX Lanches</Title>

        {/* <p className={styles.description}>Latest SpaceX Missions</p> */}
        {/* <div className={styles.grid}> */}
        <Row gutter={[32, 32]}>
          {launches.map((launch) => {
            const img = launch.links.flickr_images[0] || "/assets/card.jpg";
            console.log(img);
            return (
              <Col
                xs={24}
                sm={8}
                lg={6}
                key={launch.mission_name}
                className={styles.launchCard}
              >
                <Link href={"/" + launch.rocket.rocket.id}>
                  <a>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img className={styles.cardImage} alt="" src={img} />
                      }
                    >
                      <Meta
                        title="Europe Street beat"
                        description="www.instagram.com"
                      />
                    </Card>
                  </a>
                </Link>
              </Col>
            );
          })}
        </Row>
        {/* </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
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
        launchesPast(limit: 10) {
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

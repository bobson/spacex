import { Col } from "antd";
import { Card as AntCard } from "antd";

import styles from "../styles/Card.module.css";

import Link from "next/link";

const { Meta } = AntCard;

const Card = ({ launch, img }) => {
  return (
    <Col xs={24} sm={8} lg={6} className={styles.launchCard}>
      <Link href={"/" + launch.rocket.rocket.id}>
        <a>
          <AntCard
            hoverable
            cover={<img className={styles.cardImage} alt="" src={img} />}
            className={styles.card}
          >
            <Meta
              title={launch.mission_name}
              description={new Date(launch.launch_date_local).toDateString()}
            />
          </AntCard>
        </a>
      </Link>
    </Col>
  );
};

export default Card;

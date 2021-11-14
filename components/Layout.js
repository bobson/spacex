import { Menu, Breadcrumb, Select } from "antd";
import { Layout as AntLayout } from "antd";

import styles from "../styles/Home.module.css";

import Image from "next/image";
import Link from "next/link";

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <Header className={styles.header}>
        <Link href="/">
          <a>
            <Image src="/assets/spaceXlogo.jpg" width="300px" height="60px" />
          </a>
        </Link>
        <Menu mode="horizontal" />
      </Header>
      <Content style={{ padding: "50px" }} className={styles.content}>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </AntLayout>
  );
};

export default Layout;

import { Menu } from "antd";
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}></Menu>
      </Header>

      <Content style={{ padding: "50px" }} className={styles.content}>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Design ©{new Date().getFullYear()} Created by Slobodan
      </Footer>
    </AntLayout>
  );
};

export default Layout;

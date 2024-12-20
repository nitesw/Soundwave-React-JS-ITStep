import React, { useContext, useState } from "react";
import { Breadcrumb, Layout as LayoutAnt, Menu, theme } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  StarOutlined,
} from "@ant-design/icons";
import MusicTable from "./MusicTable";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MusicContext } from "../contexts/music.context";
const { Header, Content, Footer } = LayoutAnt;
const items = [
  {
    key: "/",
    label: "Home",
    icon: (
      <Link to="/">
        <HomeOutlined />
      </Link>
    ),
  },
  {
    key: "/music",
    label: "Music",
    icon: (
      <Link to="/music">
        <MenuOutlined />
      </Link>
    ),
  },
  {
    key: "/favourites",
    label: "Favourites",
    icon: (
      <Link to="/favourites">
        <StarOutlined />
      </Link>
    ),
  },
  {
    key: "/about",
    label: "About",
    icon: (
      <Link to="/about">
        <InfoCircleOutlined />
      </Link>
    ),
  },
];
const Layout = () => {
  const { count } = useContext(MusicContext);

  const location = useLocation();
  const [current] = useState(() => {
    return location.pathname.startsWith("/music")
      ? "/music"
      : location.pathname;
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <LayoutAnt className="Layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[current]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <span style={{ color: "white" }}>Favourites: {count}</span>
      </Header>

      <Content
        className="main"
        style={{
          padding: "0 48px",
          margin: "16px 0",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </LayoutAnt>
  );
};
export default Layout;

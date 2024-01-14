"use client";

import Link from "next/link";
import { Typography } from "antd";
import { Button, Layout } from "antd";
const { Header, Footer, Content } = Layout;
import ImageUploader from "@components/ImageUploader";
import { PhotoSection } from "@components/PhotoSection";
import { ScrollToTop } from "@components/ScrollToTopButton";

const { Title } = Typography;

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 100,
  paddingInline: 48,
  lineHeight: "100px",
  backgroundColor: "#FFFFFF",
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#eeedeb",
};

const layoutStyle = {
  borderRadius: 8,
};

const Home = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Link href="/">
          <Title level={2}>inside out</Title>
        </Link>
        <Button type="text" href="/about">
          About
        </Button>
      </Header>
      <Content style={contentStyle}>
        <ScrollToTop />
        {/* <ImageUploader /> */}
        <PhotoSection />
      </Content>
      <Footer style={footerStyle}></Footer>
    </Layout>
  );
};

export default Home;

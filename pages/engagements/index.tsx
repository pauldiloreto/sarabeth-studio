import { GetStaticProps } from "next";
import React from "react";
import BannerImage from "../../components/BannerImage";
import PageLayout from "../../components/PageLayout";
import WidthContainer from "../../components/WidthContainer";
import getCommonData from "../../utils/fetchers/common";
import getEngagementData from "../../utils/fetchers/engagements";
import styles from "./Engagements.module.scss";
import type { PageProps } from "../../utils/fetchers/common";
import type { EngagementData } from "../../utils/fetchers/engagements";

type Props = {
  engagementData: EngagementData;
} & PageProps;

const Engagements = ({ commonData, engagementData }: Props) => {
  console.log(engagementData);
  return (
    <PageLayout
      metadata={{
        title: "Sarabeth's Engagements",
        description:
          "Young and talented female opera singer, Sarabeth Belon, captivates audiences throughout the country. Learn more about her current and upcoming engagements!",
        keywords: ["sarabeth belon engagements"],
      }}
      commonData={commonData}
    >
      <BannerImage
        image={engagementData.bannerImage}
        title={engagementData.title}
      />
      <WidthContainer className={styles.container}>some stuff</WidthContainer>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [commonData, engagementData] = await Promise.all([
    getCommonData(),
    getEngagementData(),
  ]);
  return { props: { commonData, engagementData } };
};

export default Engagements;
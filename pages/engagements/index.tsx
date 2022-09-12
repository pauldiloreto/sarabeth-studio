import { GetStaticProps } from "next";
import React from "react";
import BannerImage from "../../components/BannerImage";
import EngagementsTable from "../../components/EngagementsTable";
import PageLayout from "../../components/PageLayout";
import WidthContainer from "../../components/WidthContainer";
import getCommonData from "../../utils/fetchers/common";
import getEngagementData from "../../utils/fetchers/engagements";
import styles from "./Engagements.module.scss";
import type { PageProps } from "../../utils/fetchers/common";
import type { EngagementData } from "../../utils/fetchers/engagements";
import type { Engagement } from "../../utils/fetchers/engagements";

type Props = {
  engagementData: EngagementData;
} & PageProps;

const Engagements = ({ commonData, engagementData }: Props) => {
  const upcoming: Engagement[] = [];
  const past: Engagement[] = [];
  const today = new Date();
  today.setUTCHours(24, 0, 0, 0);
  for (const engagement of engagementData.engagements) {
    const endDate = new Date(engagement.endDate);
    endDate.setUTCHours(24, 0, 0, 0);
    if (endDate >= today) {
      upcoming.push(engagement);
    } else {
      past.push(engagement);
    }
  }

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
      <WidthContainer className={styles.container}>
        {upcoming.length > 0 && (
          <EngagementsTable engagements={upcoming} label="Upcoming" />
        )}
        {past.length > 0 && (
          <EngagementsTable engagements={past} label="Past" />
        )}
      </WidthContainer>
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

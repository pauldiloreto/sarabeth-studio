import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import ArrowButton from "../components/ArrowButton";
import PageLayout from "../components/PageLayout";
import StyledImage from "../components/StyledImage";
import WidthContainer from "../components/WidthContainer";
import LogoSvg from "../public/logo.svg";
import styles from "../styles/Home.module.css";
import getCommonData from "../utils/server/fetchers/common";
import getHomeData from "../utils/server/fetchers/home";
import type { HomeData, PageProps } from "../utils/types";

type Props = {
  homeData: HomeData[];
} & PageProps;

const getImageClasses = (
  totalImageNum: number,
  width: number,
  height: number
) => {
  const isPortrait = width < height;
  if (totalImageNum <= 1) return "";
  if (isPortrait) return styles.portraitImage;
  return styles.landscapeImage;
};

const isTeachingSection = (name: string) => {
  return /sarabeth'?s\s*studio/gi.test(name);
};

const makeRelativeUrl = (url: string) => {
  return url.replace(/^https?:\/\/(.+\.)?sarabethbelon\.com/, "");
};

const animateProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 1 },
  variants: { visible: { opacity: 1 }, hidden: { opacity: 0 } },
};

const Home = ({ commonData, homeData }: Props) => {
  return (
    <PageLayout
      metadata={{
        title: "Sarabeth Belón: Portfolio",
        description:
          "Sarabeth Belon, a young female opera singer, captivates audiences with her tessitura and repertoire versatility. Learn more about this artist!",
        keywords: ["young female opera singer", "opera singer los angeles"],
      }}
      commonData={commonData}
    >
      <WidthContainer className={styles.container}>
        {homeData.map((homeRow, rowIndex) => (
          <div key={homeRow.id} className={styles.homeRow}>
            <div
              className={
                isTeachingSection(homeRow.title)
                  ? styles.teachingImages
                  : styles.rowImages
              }
            >
              {homeRow.images.map((image) => (
                <motion.div
                  key={image.id}
                  className={getImageClasses(
                    homeRow.images.length,
                    image.width,
                    image.height
                  )}
                  {...animateProps}
                >
                  <StyledImage
                    priority={rowIndex < 2}
                    overlayDirection={
                      image.width > image.height ? "left" : "right"
                    }
                    image={image}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              className={`${
                homeRow.mainSection
                  ? styles.mainTextSection
                  : styles.textSection
              } ${isTeachingSection(homeRow.title) && styles.teachingSection}`}
              {...animateProps}
              transition={{ duration: 2 }}
            >
              {isTeachingSection(homeRow.title) && (
                <LogoSvg className={styles.logoSvg} />
              )}
              {!homeRow.mainSection && (
                <>
                  <h1 className={styles.title}>{homeRow.title}</h1>
                  <h2 className={styles.subtitle}>{homeRow.subtitle}</h2>
                  <div className={styles.divider} />
                </>
              )}
              <div className={styles.description}>
                {documentToReactComponents(homeRow.description)}
              </div>
              {homeRow.buttonLink && (
                <ArrowButton
                  label={homeRow.buttonText}
                  url={makeRelativeUrl(homeRow.buttonLink)}
                />
              )}
            </motion.div>
          </div>
        ))}
      </WidthContainer>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [commonData, homeData] = await Promise.all([
    getCommonData(),
    getHomeData(),
  ]);
  return { props: { commonData, homeData } };
};

export default Home;

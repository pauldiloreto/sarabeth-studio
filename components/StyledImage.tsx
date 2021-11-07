import React from "react";
import styles from "../styles/StyledImage.module.css";
import NextImage from "next/image";
import { Image as ImageType } from "../util/contentful-types";

interface Props {
  type: "left" | "right";
  image: ImageType;
}

export const StyledImage = (props: Props) => (
  <div className={styles.container}>
    <div className={styles[props.type]} />
    <NextImage
      alt={props.image.description}
      src={props.image.url}
      layout="responsive"
      width={props.image.width}
      height={props.image.height}
    />
  </div>
);

export default StyledImage;

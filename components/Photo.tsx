import React from "react";
import Image from "next/image";
import { PhotoData } from "./PhotoSection";

const Photo = ({ data, index }: { data: PhotoData; index: number }) => {
  return (
    <>
      <Image
        src={data.url}
        key={index}
        alt={data.url}
        blurDataURL={data.url}
        width={1200}
        height={800}
        className="p-10"
        style={{ width: "45%" }}
        loading="lazy"
      />
    </>
  );
};

export default Photo;

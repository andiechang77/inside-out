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
        width={600}
        height={400}
        className="m-10"
      />
    </>
  );
};

export default Photo;

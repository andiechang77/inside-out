"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Flex, Space } from "antd";
import axios from "axios";

const Photo = ({ data, index }) => {
  return (
    <>
      <Image
        src={data.url}
        key={index}
        alt={data.url}
        width={600}
        height={400}
        className="m-5"
      />
    </>
  );
};

export default Photo;

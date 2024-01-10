import React, { useEffect, useState } from "react";
import { Divider, Flex, Typography } from "antd";
import Photo from "@components/Photo";

const { Title } = Typography;

export interface PhotoData {
  url: string;
  category: string;
}

interface OrganizedPhotos {
  [category: string]: PhotoData[];
}

const organizePhotosByCategory = (photos: PhotoData[]) => {
  const organizedPhotos: OrganizedPhotos = {};

  photos.forEach((photo) => {
    const category = photo.category || "Uncategorized";
    if (!organizedPhotos[category]) {
      organizedPhotos[category] = [];
    }
    organizedPhotos[category].push(photo);
  });

  return organizedPhotos;
};

export const PhotoSection = () => {
  const [photosByCategory, setPhotosByCategory] = useState<OrganizedPhotos>({});

  const fetchData = async () => {
    try {
      const data = await fetch("/api/uploads");
      const json = await data.json();
      console.log("json: ", json);
      const photos = json.map((item: any) => ({
        url: `/api/uploads/${item.filename}`,
        category: item.category || "unknown",
      }));

      const organizedPhotos = organizePhotosByCategory(photos);
      setPhotosByCategory(organizedPhotos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {Object.entries(photosByCategory).map(([category, categoryPhotos]) => (
        <div key={category} className="ml-10">
          <Title level={4} className="mb-0 ml-10">
            {category}
          </Title>
          <Flex wrap="wrap" justify="center">
            {categoryPhotos.map((photo, index) => (
              <Photo data={photo} index={index} key={index} />
            ))}
          </Flex>
          <Divider />
        </div>
      ))}
    </div>
  );
};

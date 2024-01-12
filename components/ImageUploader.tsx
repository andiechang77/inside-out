"use client";

import React, { FormEvent, useRef } from "react";
const ImageUploader = () => {
  // 1. add reference to input element
  const ref = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 2. get reference to the input element
    const input = ref.current!;
    const tagInput = tagInputRef.current!;

    // 3. build form data
    const files = Array.from(input.files ?? []);
    // formData.append("tags", tagInput.value);

    let uploaded: { [key: string]: string } = {};

    // cloudinary api can only upload an image at a time
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "inside-out");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dvalvi2b7/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      uploaded[data.original_filename] = data.secure_url;
    }

    // 4. build another form data and send to mongodb
    const formDataFromMongoDb = new FormData();
    formDataFromMongoDb.append("tags", tagInput.value);
    for (let key of Object.keys(uploaded)) {
      let value = uploaded[key];
      formDataFromMongoDb.append(key, value);
    }
    await fetch("api/upload", {
      method: "POST",
      body: formDataFromMongoDb,
    });
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input type="file" name="files" ref={ref} multiple />
        <input type="text" placeholder="#Tag" ref={tagInputRef} />
        <button
          type="submit"
          className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default ImageUploader;

"use client";
import { useState } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

export default function DefaultHome() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {};

  return (
    <div className="container mt-5">
      <div className="align-items-center mb-4 gap-24">
        {/* <h2 className="me-3 mr-10 mb-4">Upload Image</h2>{" "} */}
        <label className="upload-area  align-items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
          />
          <div className="upload-text d-flex align-items-center border p-4">
            <FiUpload className="upload-icon me-2" />
            <span>Click to Upload Image</span>
          </div>
        </label>
      </div>

      {image && (
        <div className="mb-4">
          <h4>Your Uploaded Image:</h4>
          <div className="d-flex flex-column flex-lg-row align-items-start gap-4 image-pose-container">
            {/* Uploaded Image Preview */}
            <div className="uploaded-image-container">
              <Image
                src={image}
                alt="Uploaded"
                width={350}
                height={300}
                className="rounded shadow-sm"
              />
            </div>
            <button className="btn custom-btn" onClick={handleGenerate}>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

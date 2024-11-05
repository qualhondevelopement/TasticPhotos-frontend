"use client";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

export default function DefaultHome() {
  const [imageName, setImageName] = useState("Click to Upload Image");
  const [image, setImage] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setImage(true);
    }
  };

  const handleImageRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImageName("Click to Upload Image");
    setImage(false);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="align-items-center text-center mb-4">
        <div
          className="upload-area align-items-center"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
          />
          <div className="upload-container border p-3">
            {image ? (
              <div className="image-preview">
                <span className="image-name">{imageName}</span>
                <IoIosClose
                  size={24}
                  color="red"
                  onClick={handleImageRemove}
                  style={{ cursor: "pointer" }}
                  className="remove-icon"
                />
              </div>
            ) : (
              <div className="upload-prompt">
                <FiUpload className="upload-icon me-2" />
                <span>{imageName}</span>
              </div>
            )}
          </div>
        </div>
        <div className="btn-search-outer mt-3">
          <a href="#" className="custom-btn">
            Search
          </a>
        </div>
      </div>
    </div>
  );
}

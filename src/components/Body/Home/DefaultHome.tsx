"use client";

import { useState, forwardRef } from "react";
import { FiUpload } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

const DefaultHome = () => {
  const [imageName, setImageName] = useState("Click to Upload Image");
  const [image, setImage] = useState(false);
  const loading = useSelector((state: any) => state.loading);

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
  // console.log(loading);

  return (
    <div>
      {/* {loading === false && ( */}
      <div className="container mt-5 d-flex justify-content-center">
        <div className="align-items-center text-center mb-4">
          <div
            className="upload-area align-items-center upload-picture-input cursor-pointer"
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
                <div className="upload-prompt" id="upload-file">
                  <FiUpload className="upload-icon me-2" />
                  <span>{imageName}</span>
                </div>
              )}
            </div>
          </div>
          <div className="btn-search-outer mt-3" id="target-section">
            <a className="custom-btn">Search</a>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default DefaultHome;

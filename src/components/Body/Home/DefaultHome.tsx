"use client";

import { setLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, forwardRef } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DefaultHome = () => {
  const router = useRouter();

  const [imageName, setImageName] = useState("Click to Upload Image");
  const [image, setImage] = useState(false);
  const loading = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);

      setImageName(file.name);
      setImage(true);
    }
  };

  const handleImageRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImageFile(null);

    setImageName("Click to Upload Image");
    setImage(false);
  };
  // console.log(loading);

  const handleSearchImage = async () => {
    if (!imageFile) {
      toast.error("Please upload an image before searching.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/find-gallery-by-face/`,
        formData
      );
      if (response.data.success) {
        dispatch(setLoading(false));

        router.push(response.data.url);
      }

      console.log("Response:", response.data);
    } catch (error: any) {
      dispatch(setLoading(false));

      toast.error(error.response.data.error);
      console.error("Error uploading image:", error.response.data.error);
    }
  };

  return (
    <div>
      {loading === false && (
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
            <div
              className="btn-search-outer mt-3"
              id="target-section"
              onClick={handleSearchImage}
            >
              <a className="custom-btn">Search</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultHome;

"use client";

import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const DefaultHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState("Click to Upload Image");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMssg, setErrorMssg] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState("");
  const loading = useSelector((state: any) => state.loading);

  // Cleanup loading state on unmount
  useEffect(() => {
    return () => {
      dispatch(setLoading(false));
    };
  }, [dispatch]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      setErrorMssg(null);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImageName("Click to Upload Image");
    setErrorMssg(null);
  };

  const handleSearchImage = async () => {
    const hasImage = Boolean(imageFile);
    const hasQRCode = qrCode.trim() !== "";

    if (hasImage && hasQRCode) {
      toast.error("Please use either image or QR code, not both");
      return;
    }

    if (!hasImage && !hasQRCode) {
      toast.error("Please provide image or QR code");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setCartData(null));

    try {
      if (hasImage) {
        const formData = new FormData();
        formData.append("image", imageFile!);

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/find-gallery-by-face/`,
          formData
        );

        if (data.success) {
          router.push(data.url); // Navigation happens while loading is still true
        }
      } else {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${qrCode}`
        );
        router.push(`/${qrCode}`);
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      setErrorMssg(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {!loading && (
        <div className="text-center mb-4 parent-div-home-qr">
          <div className="d-flex gap-3 align-items-center qrcode-outer">
            {/* Image Upload Section */}
            <div
              className="upload-area cursor-pointer"
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
                {imageFile ? (
                  <div className="image-preview">
                    <span className="image-name">{imageName}</span>
                    <IoIosClose
                      size={24}
                      color="red"
                      onClick={handleImageRemove}
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <FiUpload className="me-2" />
                    <span>{imageName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="or-span">
              <span>OR</span>
            </div>

            {/* QR Code Input */}
            <div className="border">
              <input
                type="text"
                placeholder="Enter QR code"
                className="p-3 enter-search-qrarea"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value.trim())}
                maxLength={20}
              />
            </div>
          </div>

          {errorMssg && (
            <div className="p-2">
              <span className="text-danger">{errorMssg}</span>
            </div>
          )}

          <div className="mt-3">
            <button
              className="custom-btn"
              onClick={handleSearchImage}
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultHome;

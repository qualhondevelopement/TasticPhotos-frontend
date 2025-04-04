"use client";

import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, forwardRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DefaultHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [imageName, setImageName] = useState("Click to Upload Image");
  const [image, setImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMssg, setErrorMssg] = useState(null);
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
      setErrorMssg(null);
      setImageName(file.name);
      setImage(true);
    }
  };

  const handleImageRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setImageFile(null);
    setImageName("Click to Upload Image");
    setImage(false);
    setErrorMssg(null);
  };
  // console.log(loading);

  const handleSearchImage = async () => {
    if (imageFile && qrCode.trim()) {
      toast.error("Please remove either the image or the QR code.", {
        id: "both-inputs-error",
      });
      return;
    }

    if (!imageFile && !qrCode.trim()) {
      toast.error("Please upload an image or enter a QR code.", {
        id: "search-error",
      });
      return;
    }

    dispatch(setCartData(null));
    setErrorMssg(null);

    try {
      if (imageFile) {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/find-gallery-by-face/`,
          formData
        );

        if (response.data.success) {
          router.push(response.data.url);
        }
      } else if (qrCode.trim()) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${qrCode}`
        );

        router.push(`/${qrCode}`);
      }
    } catch (error: any) {
      setErrorMssg(error.response?.data?.message || "An error occurred.");
      console.error("Search error:", error.response?.data?.error || error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleQrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrCode(e.target.value.trim());
    setErrorMssg(null);
  };
  // {
  //   await axios.get(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${qrCode}`
  //   );
  //   router.push(`/${qrCode}`);
  // }
  return (
    <div>
      {!loading && (
        <div className="container mt-5 d-flex justify-content-center ">
          <div className="align-items-center text-center mb-4 parent-div-home-qr">
            <div className="d-flex gap-3 align-items-center qrcode-outer">
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
              <div className="or-span">
                <span>OR</span>
              </div>
              <div className="align-items-center border">
                <input
                  type="text"
                  name="qr-reader"
                  placeholder="Enter QR code"
                  className="p-3 enter-search-qrarea"
                  value={qrCode}
                  onChange={handleQrCodeChange}
                  onBlur={() => setQrCode((prev) => prev.trim())}
                  maxLength={20}
                />
              </div>
            </div>

            {errorMssg && (
              <div className="p-2">
                <span className="text-danger " role="alert">
                  {errorMssg}
                </span>
              </div>
            )}

            <div className="btn-search-outer mt-3" id="target-section">
              <a className="custom-btn" onClick={handleSearchImage}>
                Search
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultHome;

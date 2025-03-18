"use client";
import LightBoxModal from "@/components/Modals/LightBoxModal";
import Image from "next/image";
import React, { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type ImageCardProps = {
  title: string;
  data: { [key: string]: string } | undefined;
  onSelectImage: (src: string, isChecked: boolean) => void;
  selectedImages: string[];
};

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  data,
  onSelectImage,
  selectedImages,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const [modalImage, setModalImage] = useState("");
  const [modalImages, setModalImages] = useState<string[]>([]); // List of images
  const [initialIndex, setInitialIndex] = useState<number>(0); // Initial index for the Swiper

  const [caption, setCaption] = useState("");

  const handleImageClick = (src: string, index: number) => {
    if (data) {
      // Convert the data object to an array of image URLs
      const imageList = Object.values(data);

      // Set modal images and initial slide index
      setModalImages(imageList);
      setInitialIndex(index);
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="col-md-12">
      <div className="heading-fonts">
        <h3 className="text-capitalize">{title}</h3>
        <hr className="hr-line left-line" />
      </div>
      <div className="row row-marg ">
        {data &&
          Object.entries(data).map(
            ([id, src]: [string, string], index: number) => (
              <div className="col-lg-4 col-md-6" key={id}>
                <div className="images-main">
                  <img
                    src={src}
                    alt={`Image ${id}`}
                    className="w-100 img-fluid"
                    onClick={() => handleImageClick(src, index)}
                  />
                  <div className="input11">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(id)}
                      onChange={(e) => onSelectImage(id, e.target.checked)}
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            )
          )}
      </div>

      {showModal && (
        <LightBoxModal
          show={showModal}
          images={modalImages}
          initialIndex={initialIndex}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ImageCard;

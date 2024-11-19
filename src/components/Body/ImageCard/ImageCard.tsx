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
  const [modalImage, setModalImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleImageClick = (src: string, alt: string) => {
    setModalImage(src);
    setCaption(alt);
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
                    onClick={() => handleImageClick(src, `Image ${id}`)}
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
          imageSrc={modalImage}
          caption={caption}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ImageCard;

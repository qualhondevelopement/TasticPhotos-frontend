"use client";
import React from "react";


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
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
  };
  return (
    <div>
      <div className="col-md-12">
        <div className="heading-fonts">
          <h3>{title}</h3>
          <hr className="hr-line left-line" />
        </div>
        <div className="row row-marg ">
          {data &&
            Object.entries(data).map(
              ([id, src]: [string, string], index: number) => (
                <div className="col-md-4" key={id}>
                  <div className="images-main">
                    <img src={src} alt={`Image ${id}`} className="w-100" />
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
      </div>
    </div>
  );
};

export default ImageCard;

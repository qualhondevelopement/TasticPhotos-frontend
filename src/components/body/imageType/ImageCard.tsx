"use client";
import React from "react";

type ImageCardProps = {
  title: string;
};

type ImageItemProps = {
  src: string;
};

const ImageItem: React.FC<ImageItemProps> = ({ src }) => (
  <div className="col-md-4">
    <div className="images-main">
      <img src={src} className="w-100" />
      <div className="input11">
        <input type="checkbox" />
        <span></span>
      </div>
    </div>
  </div>
);

const ImageCard: React.FC<ImageCardProps> = ({ title }) => {
  const images = [
    "images/img-1.webp",
    "images/img-2.webp",
    "images/img-3.webp",
    "images/img-4.webp",
    "images/img-5.webp",
    "images/img-6.webp",
  ];

  return (
    <div>
      <div className="col-md-12">
        <div className="heading-fonts">
          <h3>{title}</h3>
          <hr className="hr-line left-line" />
        </div>
        <div className="row row-marg">
          {images.map((src, index) => (
            <ImageItem key={index} src={src} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

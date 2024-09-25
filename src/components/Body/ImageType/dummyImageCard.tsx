"use client";
import React from "react";

type ImageCardProps = {
  title: string;
  data: { [key: string]: string } | undefined;
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

const ImageCard: React.FC<ImageCardProps> = ({ title, data }) => {
  return (
    <div>
      <div className="col-md-12">
        <div className="heading-fonts">
          <h3>{title}</h3>
          <hr className="hr-line left-line" />
        </div>
        <div className="row row-marg">
          {data &&
            Object.values(data).map((src: string, index: number) => (
              <ImageItem key={index} src={src} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
